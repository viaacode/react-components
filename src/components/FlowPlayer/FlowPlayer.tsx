/**
 * This component assumes these files are loaded in the index.html of your project
 *   <link rel="stylesheet" href="/flowplayer/style/flowplayer.css">
 *   <script src="/flowplayer/flowplayer.min.js"></script>
 *   <script src="/flowplayer/plugins/chromecast.min.js"></script>
 *   <script src="/flowplayer/plugins/airplay.min.js"></script>
 *   <script src="/flowplayer/plugins/subtitles.min.js"></script>
 *   <script src="/flowplayer/plugins/hls.min.js"></script>
 *   <script src="/flowplayer/plugins/cuepoints.min.js"></script>
 *   <script src="/flowplayer/plugins/google-analytics.min.js"></script>
 *   <script src="/flowplayer/plugins/audio.min.js"></script>
 */
import React, { createRef } from 'react';
import WaveformData from 'waveform-data';

import { FlowplayerInstance, FlowPlayerProps, FlowPlayerState } from './FlowPlayer.types';
import { convertGAEventsArrayToObject } from './FlowPlayer.utils';
import { drawPeak } from './Peak/draw-peak';

import './FlowPlayer.scss';

declare const flowplayer: any;

class FlowPlayer extends React.Component<FlowPlayerProps, FlowPlayerState> {
	private videoContainerRef = createRef<HTMLDivElement>();
	private peakCanvas = createRef<HTMLCanvasElement>();

	constructor(props: FlowPlayerProps) {
		super(props);
		this.state = {
			flowPlayerInstance: null,
			startedPlaying: false,
			waveformData: this.props.peakJson ? WaveformData.create(this.props.peakJson) : null,
		};
	}

	private destroyPlayer() {
		this.setState((state) => {
			const flowPlayerInstance = state.flowPlayerInstance;
			if (flowPlayerInstance) {
				flowPlayerInstance.destroy();
				if (flowPlayerInstance.parentElement) {
					flowPlayerInstance.parentElement.innerHTML = '';
				}
			}
		});
	}

	componentWillUnmount() {
		this.destroyPlayer();
	}

	shouldComponentUpdate(nextProps: FlowPlayerProps) {
		if (!this.videoContainerRef.current) {
			return true;
		}

		const flowPlayerInstance = this.state.flowPlayerInstance;
		if (flowPlayerInstance) {
			if (nextProps.seekTime !== this.props.seekTime && nextProps.seekTime) {
				flowPlayerInstance.currentTime = nextProps.seekTime;
			}

			if (nextProps.pause !== this.props.pause) {
				if (nextProps.pause) {
					flowPlayerInstance.pause();
				} else {
					flowPlayerInstance.play();
				}
			}

			if (nextProps.fullscreen !== this.props.fullscreen) {
				(flowPlayerInstance as any).toggleFullScreen(nextProps.fullscreen);
			}

			if (nextProps.start !== this.props.start || nextProps.end !== this.props.end) {
				if (this.videoContainerRef) {
					flowPlayerInstance.emit(flowplayer.events.CUEPOINTS, {
						cuepoints: [
							{
								start: nextProps.start,
								end: nextProps.end,
							},
						],
					});
				}
			}

			// Pause video when modal opens in front
			// Or pause video when modal is closed which contains this flowplayer
			if (!nextProps.canPlay && this.props.canPlay) {
				flowPlayerInstance.pause();
			}
		}

		if (nextProps.poster !== this.props.poster && (this.props.poster || nextProps.poster)) {
			// Video was changed before playing the video
			return true;
		}

		// string | { src: string, type: string }[]
		const nextUrl: string | undefined =
			nextProps.src &&
			(((nextProps.src?.[0] as { src: string })?.src || nextProps?.src) as string)?.split(
				'?'
			)?.[0];
		const currentUrl: string | undefined =
			this.props.src &&
			(((this.props.src?.[0] as { src: string })?.src || this.props?.src) as string)?.split(
				'?'
			)?.[0];
		if (nextUrl !== currentUrl) {
			if (nextUrl) {
				// User clicked the post to play the video
				this.reInitFlowPlayer(nextProps);
			} else {
				// User clicked another video and the video src has been set to undefined
				this.destroyPlayer();
			}
			return true;
		}

		return false;
	}

	componentDidMount() {
		if (this.props.src) {
			this.reInitFlowPlayer(this.props);
		}
	}

	private createTitleOverlay() {
		const titleOverlay = document.createElement('div');
		titleOverlay.classList.add('c-title-overlay');

		const publishDiv = document.createElement('div');
		publishDiv.classList.add('u-d-flex');

		if (this.props.title) {
			const titleHeader = document.createElement('h5');
			titleHeader.classList.add('c-title-overlay__title');
			titleHeader.innerText = this.props.title || '';
			titleOverlay.appendChild(titleHeader);
		}

		titleOverlay.classList.add('a-flowplayer__title');
		titleOverlay.appendChild(publishDiv);

		if (this.props.metadata && this.props.metadata.length) {
			this.props.metadata.forEach((metadata: string) => {
				const substituteDiv = document.createElement('div');
				substituteDiv.innerText = metadata;
				substituteDiv.classList.add('c-title-overlay__meta');
				publishDiv.appendChild(substituteDiv);
			});
		}

		return titleOverlay;
	}

	private createLogoOverlay() {
		if (this.props.logo) {
			const logoOverlay = document.createElement('div');
			const logoImg = document.createElement('img');

			logoOverlay.classList.add('c-logo-overlay');
			logoImg.classList.add('c-logo-overlay__img');

			logoImg.src = this.props.logo;

			logoOverlay.appendChild(logoImg);

			return logoOverlay;
		}
	}

	private drawCustomElements(flowplayerInstance: FlowplayerInstance) {
		if (!flowplayerInstance.parentElement) {
			return;
		}
		const flowPlayerUi = flowplayerInstance.parentElement.querySelector('.fp-ui');
		const titleElem = this.createTitleOverlay();
		const logoElem = this.createLogoOverlay();
		if (flowPlayerUi) {
			flowPlayerUi.prepend(titleElem);
			if (logoElem) {
				flowPlayerUi.prepend(logoElem);
			}
		}
	}

	private static cuePointEndListener(flowplayerInstance: FlowplayerInstance | null | undefined) {
		if (flowplayerInstance) {
			flowplayerInstance.pause();
		}
	}

	private redrawPeaks(currentTime: number, duration: number) {
		if (this.props.peakJson && this.peakCanvas.current && this.state.waveformData && duration) {
			drawPeak(this.peakCanvas.current, this.state.waveformData, currentTime / duration);
		}
	}

	private static noop() {
		// do nothing.
	}

	private reInitFlowPlayer(props: FlowPlayerProps) {
		this.destroyPlayer();

		if (!this.videoContainerRef.current) {
			return;
		}

		const plugins = props.plugins || [
			'speed',
			'subtitles',
			'chromecast',
			'cuepoints',
			'hls',
			'ga',
			'audio',
		];
		const flowplayerConfig = {
			// DATA
			src: props.src,
			token: props.token,
			poster: props.poster,

			// CONFIGURATION
			autoplay: props.autoplay,
			ui: flowplayer.ui.LOGO_ON_RIGHT | flowplayer.ui.USE_DRAG_HANDLE,
			plugins,
			preload: props.preload || (!props.poster ? 'metadata' : 'none'),

			// SPEED
			...(plugins.includes('speed')
				? {
						speed: {
							options: [0.2, 0.5, 1, 2, 10],
							labels: ['0.2x', '0.5x', '1x', '2x', '10x'],
						},
				  }
				: {}),

			// CUEPOINTS
			...(plugins.includes('subtitles') && props.end
				? {
						cuepoints: [
							{
								start: props.start,
								end: props.end, // Only set cuepoints if end is provided in the props
							},
						],
						draw_cuepoints: true,
				  }
				: {}),

			// SUBTITLES
			...(plugins.includes('subtitles')
				? {
						subtitles: {
							tracks: props.subtitles,
						},
				  }
				: {}),

			// CHROMECAST
			...(plugins.includes('chromecast')
				? {
						chromecast: {
							app: flowplayer.chromecast.apps.STABLE,
						},
				  }
				: {}),

			// GOOGLE ANALYTICS
			...(plugins.includes('ga') && props.googleAnalyticsId
				? {
						ga: {
							ga_instances: [props.googleAnalyticsId],
							event_actions: props.googleAnalyticsEvents
								? convertGAEventsArrayToObject(props.googleAnalyticsEvents)
								: {},
							media_title: props.googleAnalyticsTitle || props.title,
						},
				  }
				: {}),
		};

		const flowplayerInstance: FlowplayerInstance = flowplayer(
			this.videoContainerRef.current,
			flowplayerConfig
		);

		if (!flowplayerInstance) {
			console.error('Failed to init flow player');
			return;
		}

		// Pause video at end cuepoint
		if (props.end) {
			flowplayerInstance.on(flowplayer.events.CUEPOINT_END, () =>
				FlowPlayer.cuePointEndListener(flowplayerInstance)
			);
		}

		flowplayerInstance.on('error', (err: unknown) => {
			console.error(err);
		});

		this.drawCustomElements(flowplayerInstance);

		flowplayerInstance.on('playing', () => {
			this.props.onPlay?.();

			if (!this.state.startedPlaying) {
				// First time playing the video
				// Jump to first cue point if exists:
				if (props.start) {
					//  deepcode ignore React-propsUsedInStateUpdateMethod: Flowplayer is not aware of react
					flowplayerInstance.currentTime = props.start;
				}

				this.setState({
					...this.state,
					startedPlaying: true,
				});
			}
		});
		flowplayerInstance.on('pause', this.props.onPause || FlowPlayer.noop);
		flowplayerInstance.on('ended', this.props.onEnded || FlowPlayer.noop);
		flowplayerInstance.on('loadedmetadata', (evt: any) => {
			const videoElement = evt.currentTarget as unknown as HTMLVideoElement;
			const currentTime: number = videoElement?.currentTime || 0;
			const duration: number = videoElement?.duration || 0;
			this.redrawPeaks(currentTime, duration);
		});
		flowplayerInstance.on('timeupdate', (evt: any) => {
			const videoElement = evt.currentTarget as unknown as HTMLVideoElement;
			const currentTime: number = videoElement?.currentTime || 0;
			const duration: number = videoElement?.duration || 0;

			(this.props.onTimeUpdate || FlowPlayer.noop)(
				currentTime,
				duration ? currentTime / duration : 0
			);

			this.redrawPeaks(currentTime, duration);
		});
		flowplayerInstance.on('fullscreenenter', () => {
			(this.props.onToggleFullscreen || FlowPlayer.noop)(true);
		});
		flowplayerInstance.on('fullscreenexit', () => {
			(this.props.onToggleFullscreen || FlowPlayer.noop)(false);
		});

		this.setState({
			flowPlayerInstance: flowplayerInstance,
		});
	}

	render() {
		return (
			<div className={this.props.className + ' c-video-player'}>
				<div
					className={'c-video-player-inner'}
					data-player-id={this.props.dataPlayerId}
					ref={this.videoContainerRef}
				>
					{this.props.customControls}
					{this.props.peakJson && (
						<canvas
							ref={this.peakCanvas}
							className="c-peak"
							width="1212"
							height="779"
						/>
					)}
				</div>
			</div>
		);
	}
}

export default FlowPlayer;
