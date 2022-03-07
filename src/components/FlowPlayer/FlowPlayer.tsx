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
 */

import classnames from 'classnames';
import React, { createRef } from 'react';

import './FlowPlayer.scss';
import { FlowplayerInstance, FlowPlayerPropsSchema, FlowPlayerState } from './FlowPlayer.types';
import { convertGAEventsArrayToObject } from './FlowPlayer.utils';

declare const flowplayer: any;

class FlowPlayer extends React.Component<FlowPlayerPropsSchema, FlowPlayerState> {
	private videoContainerRef = createRef<HTMLDivElement>();

	constructor(props: FlowPlayerPropsSchema) {
		super(props);
		this.state = {
			flowPlayerInstance: null,
			startedPlaying: false,
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

	shouldComponentUpdate(nextProps: FlowPlayerPropsSchema) {
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

		const nextUrl: string | undefined = nextProps.src && nextProps.src.split('?')[0];
		const currentUrl: string | undefined = this.props.src && this.props.src.split('?')[0];
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
				const substitleDiv = document.createElement('div');
				substitleDiv.innerText = metadata;
				substitleDiv.classList.add('c-title-overlay__meta');
				publishDiv.appendChild(substitleDiv);
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

	private static noop() {
		// do nothing.
	}

	private reInitFlowPlayer(props: FlowPlayerPropsSchema) {
		this.destroyPlayer();

		if (!this.videoContainerRef.current) {
			return;
		}

		const flowplayerInstance: FlowplayerInstance = flowplayer(this.videoContainerRef.current, {
			// DATA
			src: props.src,
			token: props.token,
			poster: props.poster,

			// CONFIGURATION
			autoplay: props.autoplay,
			ui: flowplayer.ui.LOGO_ON_RIGHT | flowplayer.ui.USE_DRAG_HANDLE,
			plugins: ['speed', 'subtitles', 'chromecast', 'cuepoints', 'hls', 'ga'],
			preload: props.preload || (!props.poster ? 'metadata' : 'none'),

			speed: {
				options: [0.2, 0.5, 1, 2, 10],
				labels: ['0.2x', '0.5x', '1x', '2x', '10x'],
			},

			// CUEPOINTS
			...(props.end
				? {
						cuepoints: [
							{
								start: props.start,
								end: props.end,
							},
						],
				  }
				: {}), // Only set cuepoints if end is passed
			draw_cuepoints: true,

			// SUBTITLES
			subtitles: {
				tracks: props.subtitles,
			},

			// CHROMECAST
			chromecast: {
				app: flowplayer.chromecast.apps.STABLE,
			},

			// GOOGLE ANALYTICS
			ga: props.googleAnalyticsId
				? {
						ga_instances: [props.googleAnalyticsId],
						event_actions: props.googleAnalyticsEvents
							? convertGAEventsArrayToObject(props.googleAnalyticsEvents)
							: {},
						media_title: props.googleAnalyticsTitle || props.title,
				  }
				: {},
		});

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
		flowplayerInstance.on('timeupdate', () => {
			(this.props.onTimeUpdate || FlowPlayer.noop)(
				(this.videoContainerRef?.current as unknown as HTMLVideoElement)?.currentTime || 0
			);
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
			<div className={classnames(this.props.className, 'c-video-player')}>
				<div
					className={classnames('c-video-player-inner')}
					data-player-id={this.props.dataPlayerId}
					ref={this.videoContainerRef}
				/>
			</div>
		);
	}
}

export default FlowPlayer;
