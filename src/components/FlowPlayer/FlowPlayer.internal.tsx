import flowplayer, { type Player } from '@flowplayer/player';
import audioPlugin from '@flowplayer/player/plugins/audio';
import cuepointsPlugin from '@flowplayer/player/plugins/cuepoints';
import googleAnalyticsPlugin from '@flowplayer/player/plugins/google-analytics';
import hlsPlugin from '@flowplayer/player/plugins/hls';
import keyboardPlugin from '@flowplayer/player/plugins/keyboard';
import playlistPlugin from '@flowplayer/player/plugins/playlist';
import speedPlugin from '@flowplayer/player/plugins/speed';
import subtitlesPlugin from '@flowplayer/player/plugins/subtitles';
import clsx from 'clsx';
import { type FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { isNil } from '../../utils/is-nil';
import { keysEnter, keysSpacebar, onKey } from '../../utils/key-up';
import { noop } from '../../utils/noop';

import { registerCommands } from './FlowPlayer.commands';
import {
	ALL_FLOWPLAYER_PLUGINS,
	DELAY_BETWEEN_PLAYLIST_VIDEOS,
	dutchFlowplayerTranslations,
} from './FlowPlayer.consts';
import { convertGAEventsArrayToObject } from './FlowPlayer.helpers';
import type {
	FlowPlayerProps,
	FlowplayerConfigWithPlugins,
	FlowplayerSourceItem,
	FlowplayerSourceList,
	FlowplayerSourceListSchema,
} from './FlowPlayer.types';
import { drawPeak } from './Peak/draw-peak';

import './FlowPlayer.scss';

const flowplayerWithPlugins = flowplayer(
	subtitlesPlugin,
	hlsPlugin,
	cuepointsPlugin,
	keyboardPlugin,
	speedPlugin,
	audioPlugin,
	playlistPlugin,
	googleAnalyticsPlugin
);

const FlowPlayerInternal: FunctionComponent<FlowPlayerProps> = ({
	src,
	type,
	poster,
	title,
	metadata,
	token,
	preload,
	speed,
	dataPlayerId,
	autoplay,
	plugins = ALL_FLOWPLAYER_PLUGINS,
	start,
	end,
	logo,
	pause,
	fullscreen,
	onPlay,
	onPause,
	onEnded,
	onTimeUpdate,
	canPlay,
	className,
	playlistScrollable = false,
	renderPlaylistTile,
	subtitles,
	customControls = null,
	waveformData,
	googleAnalyticsId,
	googleAnalyticsEvents,
	googleAnalyticsTitle,
	seekable,
	ui,
	controls,
	peakColorBackground,
	peakColorInactive,
	peakColorActive,
	peakHeightFactor,
	enableRestartCuePointsButton,
	onMetadataLoaded,
}) => {
	const videoContainerRef = useRef<HTMLDivElement>(null);
	const peakCanvas = useRef<HTMLCanvasElement>(null);

	// Trick to avoid stale references in flowplayer event listener handlers: https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
	const [_player, _setPlayer] = useState<any | null>(null);
	const player = useRef(_player);
	const setPlayer = (newPlayer: any) => {
		player.current = newPlayer;
		_setPlayer(newPlayer);
	};

	const [startedPlaying, setStartedPlaying] = useState<boolean>(false);
	const [drawPeaksTimerId, setDrawPeaksTimerId] = useState<number | null>(null);
	const [activeItemIndex, setActiveItemIndex] = useState<number>(0);

	const isPlaylist = (src as FlowplayerSourceList)?.type === 'flowplayer/playlist';
	const isAudio = type === 'audio';

	const createTitleOverlay = useCallback(() => {
		const titleOverlay = document.createElement('div');
		titleOverlay.classList.add('c-title-overlay');

		const publishDiv = document.createElement('div');
		publishDiv.classList.add('u-d-flex');

		if (title) {
			const titleHeader = document.createElement('h5');
			titleHeader.classList.add('c-title-overlay__title');
			titleHeader.innerText = title || '';
			titleOverlay.appendChild(titleHeader);
		}

		titleOverlay.classList.add('a-flowplayer__title');
		titleOverlay.appendChild(publishDiv);

		if (metadata?.length) {
			for (const metadata1 of metadata) {
				const substitleDiv = document.createElement('div');
				substitleDiv.innerText = metadata1;
				substitleDiv.classList.add('c-title-overlay__meta');
				publishDiv.appendChild(substitleDiv);
			}
		}

		return titleOverlay;
	}, [metadata, title]);

	const createLogoOverlay = useCallback(() => {
		if (logo) {
			const logoOverlay = document.createElement('div');
			const logoImg = document.createElement('img');

			logoOverlay.classList.add('c-logo-overlay');
			logoImg.classList.add('c-logo-overlay__img');

			logoImg.src = logo;

			logoOverlay.appendChild(logoImg);

			return logoOverlay;
		}
	}, [logo]);

	const drawCustomElements = useCallback(() => {
		if (!videoContainerRef?.current?.parentElement) {
			return;
		}

		// Add overlay elements for title and logo
		const flowPlayerUi = videoContainerRef.current.parentElement.querySelector('.fp-ui');
		const titleElem = createTitleOverlay();
		const logoElem = createLogoOverlay();
		if (flowPlayerUi) {
			flowPlayerUi.prepend(titleElem);
			if (logoElem) {
				flowPlayerUi.prepend(logoElem);
			}
		}

		// Add cuepoint indicator div to the flowplayer timeline
		const timeline = videoContainerRef.current.parentElement.querySelector('.fp-timeline');
		if (timeline) {
			const cuePointIndicator = document.createElement('div');
			cuePointIndicator.classList.add('fp-cuepoint');
			timeline.prepend(cuePointIndicator);
		}
	}, [createLogoOverlay, createTitleOverlay]);

	/**
	 * Jump to first cuepoint if it exists
	 * @private
	 */
	const jumpToFirstCuepoint = useCallback((tempPlayer?: Player) => {
		if (!player.current && !tempPlayer) {
			return;
		}
		const flowplayerInstance = player.current || tempPlayer;
		const startTime =
			(flowplayerInstance.opts as FlowplayerConfigWithPlugins).cuepoints?.[0].startTime || 0;

		if (startTime) {
			flowplayerInstance.currentTime = startTime;
		}
	}, []);

	/**
	 * Updates the styles of the timeline cuepoint indicator according to the active cuepoint
	 */
	const updateCuepointPosition = useCallback(() => {
		try {
			const flowplayerInstance = player.current;
			const duration = flowplayerInstance.duration;
			if (!flowplayerInstance || !duration) {
				return;
			}

			const cuePointIndicator: HTMLDivElement | null =
				flowplayerInstance.parentElement.querySelector('.fp-cuepoint') as HTMLDivElement | null;

			if (cuePointIndicator) {
				let start = (flowplayerInstance.opts as FlowplayerConfigWithPlugins).cuepoints?.[0]
					?.startTime;
				let end = (flowplayerInstance.opts as FlowplayerConfigWithPlugins).cuepoints?.[0]?.endTime;

				if (isNil(start) && isNil(end)) {
					cuePointIndicator.style.display = 'none';
					return;
				}

				start = start || 0;
				end = (end || duration || 0) as number;

				cuePointIndicator.style.left = `${Math.round((start / duration) * 100)}%`;
				cuePointIndicator.style.width = `${((end - start) / duration) * 100}%`;
				cuePointIndicator.style.display = 'block';
			}
		} catch (err) {
			console.error(
				`Failed to update cuepoint location on the flowplayer progress bar: ${JSON.stringify(err)}`
			);
		}
	}, []);

	/**
	 * Sets the cuepoint config from the active item in the playlist as the cuepoint on the flowplayer
	 * @param itemIndex
	 * @private
	 */
	const updateActivePlaylistItem = useCallback(
		(itemIndex: number): void => {
			setActiveItemIndex(itemIndex);

			if (!player.current) {
				return;
			}

			const playlistItem = (src as FlowplayerSourceListSchema)?.items?.[itemIndex];

			if (playlistItem) {
				// Update cuepoint
				player.current.emit(flowplayer.events.CUEPOINTS, {
					cuepoints: playlistItem.cuepoints,
				});

				// Update poster
				player.current.poster = playlistItem.poster;
				player.current.opts.poster = playlistItem.poster;
			}
		},
		[src]
	);

	const handleLoadedMetadata = (evt: Event) => {
		updateCuepointPosition();
		onMetadataLoaded?.(evt);
	};

	const handlePlaylistNext = (evt: Event & { detail: { next_index: number } }) => {
		updateActivePlaylistItem(evt.detail.next_index);

		player.current.once('playing', jumpToFirstCuepoint);
	};

	const handlePlaylistReady = () => {
		// Update cover images on the playlist
		document.querySelectorAll('.fp-playlist li .video-info').forEach((elem, elemIndex) => {
			const image = document.createElement('img');
			image.src = (src as FlowplayerSourceListSchema).items[elemIndex].poster as string;
			const div = document.createElement('div');
			div.classList.add('image');
			div.appendChild(image);
			elem.append(div);
		});
	};

	const handlePlayingOnce = () => {
		jumpToFirstCuepoint(player.current);
	};

	const handlePlaying = () => {
		if (!startedPlaying) {
			// First time playing the video
			if (onPlay && player.current) {
				onPlay(player.current.src);
			}

			setStartedPlaying(true);
		}
	};

	const handleCuepointEnd = () => {
		if (player.current) {
			player.current.pause();
			player.current.emit(flowplayerWithPlugins.events.ENDED);
		}
	};

	const handleTimeUpdate = () => {
		(onTimeUpdate || noop)(
			(videoContainerRef?.current as HTMLVideoElement | null)?.currentTime || 0
		);
	};

	const getPreload = () => {
		if (preload) {
			return preload;
		}
		if (autoplay) {
			return 'auto';
		}
		if (poster) {
			return 'none';
		}
		return 'metadata';
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: TODO fix
	const reInitFlowPlayer = useCallback(() => {
		if (!videoContainerRef.current) {
			return;
		}

		if (player.current) {
			player.current.destroy();
			setStartedPlaying(false);
		}

		(flowplayer as any).i18n.nl = dutchFlowplayerTranslations;

		let resolvedPoster = (src as FlowplayerSourceListSchema)?.items?.[0]?.poster || poster;
		if (!resolvedPoster && isAudio) {
			// Transparent 1920 x 1080 poster
			resolvedPoster =
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB4AAAAQ4AQMAAADSHVMAAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAETSURBVHic7cEBDQAAAMKg909tDwcUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADApwH45QABmSWJDwAAAABJRU5ErkJggg==';
		}

		const flowPlayerConfig: FlowplayerConfigWithPlugins = {
			// DATA
			src: src,
			token: token,
			poster: resolvedPoster,

			// CONFIGURATION
			autoplay: autoplay ? flowplayerWithPlugins.autoplay.ON : flowplayerWithPlugins.autoplay.OFF,
			multiplay: false,
			ui:
				ui ||
				(flowplayerWithPlugins as any).ui.LOGO_ON_RIGHT |
					(flowplayerWithPlugins as any).ui.USE_DRAG_HANDLE,
			plugins,
			preload: getPreload(),
			lang: 'nl',
			seekable,
			controls,

			// KEYBOARD
			...(plugins.includes('keyboard') ? { keyboard: { seek_step: '15' } } : {}),

			// SPEED
			...(plugins.includes('speed') && speed
				? { speed: speed }
				: { speed: { options: [], labels: [] } }),

			// CUEPOINTS
			// Only set cuepoints if an end point was passed in the props or one of the playlist items has cuepoints configured
			...(plugins.includes('cuepoints') &&
			(end || (src as FlowplayerSourceListSchema)?.items?.some((item) => !!item.cuepoints))
				? {
						cuepoints: [
							{
								startTime: start,
								endTime: end,
							},
						],
					}
				: {}),

			// PLAYLIST
			...(plugins.includes('playlist') && isPlaylist
				? {
						playlist: {
							advance: true,
							skip_controls: true,
							delay: DELAY_BETWEEN_PLAYLIST_VIDEOS,
						},
					}
				: {}),

			// SUBTITLES
			...(plugins.includes('subtitles') && subtitles
				? {
						subtitles: {
							tracks: subtitles,
						},
					}
				: {}),

			// CHROMECAST
			...(plugins.includes('chromecast')
				? {
						chromecast: {
							app: (flowplayer as any).chromecast.apps.STABLE,
						},
					}
				: {}),

			// GOOGLE ANALYTICS
			...(plugins.includes('ga') && googleAnalyticsId
				? {
						ga: {
							ga_instances: [googleAnalyticsId],
							event_actions: googleAnalyticsEvents
								? convertGAEventsArrayToObject(googleAnalyticsEvents)
								: {},
							media_title: googleAnalyticsTitle || title,
						},
					}
				: {}),
		};

		const tempPlayer = flowplayerWithPlugins(
			videoContainerRef.current as HTMLElement,
			flowPlayerConfig
		);

		if (!tempPlayer) {
			console.error('Failed to init flow player');
			return;
		}

		// Jump to the end of the video when a cuepoint end event is encountered
		// The video end event can then be handled however the user sees fit
		tempPlayer.on(flowplayerWithPlugins.events.CUEPOINT_END, handleCuepointEnd);

		tempPlayer.on('error', (err: any) => {
			console.error(err);
		});

		if (plugins.includes('playlist')) {
			tempPlayer.on('playlist:ready', handlePlaylistReady);
		}

		drawCustomElements();

		tempPlayer.once('playing', handlePlayingOnce);
		tempPlayer.on('playing', handlePlaying);
		tempPlayer.on('pause', onPause || noop);
		tempPlayer.on('ended', onEnded || noop);
		tempPlayer.on(playlistPlugin.events.PLAYLIST_NEXT, handlePlaylistNext);
		tempPlayer.on('loadeddata', handleLoadedMetadata);
		tempPlayer.on('timeupdate', handleTimeUpdate);

		registerCommands(tempPlayer);

		setPlayer(tempPlayer);
	}, [
		drawCustomElements,
		end,
		googleAnalyticsEvents,
		googleAnalyticsId,
		googleAnalyticsTitle,
		jumpToFirstCuepoint,
		onEnded,
		onPause,
		onPlay,
		onTimeUpdate,
		player.current,
		plugins,
		poster,
		preload,
		speed,
		src,
		start,
		subtitles,
		title,
		token,
		updateActivePlaylistItem,
		updateCuepointPosition,
		videoContainerRef,
	]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: TODO fix
	useEffect(() => {
		videoContainerRef.current && !player.current && reInitFlowPlayer();
	}, [videoContainerRef]); // Only redo effect when ref changes

	useEffect(() => {
		if (!canPlay) {
			player.current?.pause();
		}
	}, [canPlay]);

	useEffect(() => {
		return () => {
			//  cleanup on unload component
			player.current?.destroy();
		};
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: TODO fix
	useEffect(() => {
		if (isNil(pause) || !player.current) {
			return;
		}
		if (pause) {
			player.current.pause();
		} else {
			player.current.play();
		}
	}, [player, pause]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: TODO fix
	useEffect(() => {
		if (isNil(fullscreen) || !player.current) {
			return;
		}
		player.current.toggleFullScreen(fullscreen);
	}, [player, fullscreen]);

	const drawPeaksHandler = useCallback(() => {
		if (peakCanvas.current) {
			drawPeak(
				peakCanvas.current,
				waveformData || null,
				player.current?.duration ? player.current.currentTime / player.current.duration : 0,
				peakColorBackground,
				peakColorInactive,
				peakColorActive,
				peakHeightFactor
			);
		}
	}, [peakColorActive, peakColorBackground, peakColorInactive, peakHeightFactor, waveformData]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: TODO fix
	useEffect(() => {
		if (peakCanvas.current && isAudio) {
			if (drawPeaksTimerId) {
				clearInterval(drawPeaksTimerId);
			}
			setDrawPeaksTimerId(window.setInterval(drawPeaksHandler, 1000));
		}

		return () => {
			if (drawPeaksTimerId) {
				clearInterval(drawPeaksTimerId);
			}
		};
	}, [peakCanvas, setDrawPeaksTimerId]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: TODO fix
	useEffect(() => {
		const timerId = setInterval(() => {
			updateCuepointPosition();
		}, 1000);

		return () => {
			clearInterval(timerId);
		};
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: TODO fix
	const handleMediaCardClicked = useCallback(
		(itemIndex: number): void => {
			setActiveItemIndex(itemIndex);
			player.current.playlist?.play(itemIndex);
			player.current.emit(flowplayerWithPlugins.events.CUEPOINTS, {
				cuepoints: (src as FlowplayerSourceListSchema).items[itemIndex].cuepoints,
			});

			updateCuepointPosition();
		},
		[updateCuepointPosition]
	);

	const handleReplayClicked = useCallback((): void => {
		player.current.currentTime =
			(player.current.opts as FlowplayerConfigWithPlugins).cuepoints?.[0].startTime || 0;
		player.current.play();
	}, []);
	const handlePlayClicked = useCallback((): void => player.current.play(), []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: TODO fix
	const renderPlaylistItems = useCallback(
		(playlistItems: FlowplayerSourceList['items']) => {
			return (
				<ul className="c-video-player__playlist">
					{playlistItems.map((item: FlowplayerSourceItem, itemIndex) => {
						return (
							<li
								key={`${item.src}--${itemIndex}`}
								className={`c-video-player__playlist__item${activeItemIndex === itemIndex ? ' c-video-player__playlist__item--active' : ''}`}
							>
								<button type="button" onClick={() => handleMediaCardClicked(itemIndex)}>
									{renderPlaylistTile?.(item) || item.title}
								</button>
							</li>
						);
					})}
				</ul>
			);
		},
		[handleMediaCardClicked, activeItemIndex]
	);

	const playlistItems = useMemo(() => (src as FlowplayerSourceListSchema)?.items, [src]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: TODO fix
	const playerHtml = useMemo(
		() => (
			<>
				<div
					className={clsx('c-video-player-inner', {
						'c-video-player-inner--audio': isAudio,
						'c-video-player-inner--enable-restart-cue-points-button': enableRestartCuePointsButton,
					})}
					data-player-id={dataPlayerId}
					ref={videoContainerRef}
				>
					<canvas ref={peakCanvas} className="c-peak" width="1212" height="779" />
					{customControls}
				</div>
				<div className="c-video-player-inner-overlay">
					{/** biome-ignore lint/a11y/noStaticElementInteractions: TODO fix */}
					<span
						className="fp-icon fp-replay"
						onClick={handleReplayClicked}
						onKeyDown={(e) =>
							onKey(e, [...keysEnter, ...keysSpacebar], () => {
								if (keysSpacebar.includes(e.key)) {
									e.preventDefault();
								}
								handleReplayClicked();
							})
						}
					/>
					{/** biome-ignore lint/a11y/noStaticElementInteractions: TODO fix */}
					<span
						className="fp-icon fp-custom-play"
						onClick={handlePlayClicked}
						onKeyDown={(e) =>
							onKey(e, [...keysEnter, ...keysSpacebar], () => {
								if (keysSpacebar.includes(e.key)) {
									e.preventDefault();
								}
								handlePlayClicked();
							})
						}
					/>
				</div>
			</>
		),
		[dataPlayerId]
	);

	return useMemo(() => {
		return (
			<div
				className={clsx(className, 'c-video-player', {
					'c-video-player--playlist': isPlaylist,
				})}
			>
				{playerHtml}
				{playlistItems && (
					<div className="c-video-player__playlist__wrapper">
						{playlistScrollable && (
							<PerfectScrollbar className="c-video-player__playlist__scrollable">
								{renderPlaylistItems(playlistItems)}
							</PerfectScrollbar>
						)}
						{!playlistScrollable && renderPlaylistItems(playlistItems)}
					</div>
				)}
			</div>
		);
	}, [isPlaylist, playlistItems, playlistScrollable, className, renderPlaylistItems, playerHtml]);
};

export default FlowPlayerInternal;
