import flowplayer, { Config, Player } from '@flowplayer/player';
import airplayPlugin from '@flowplayer/player/plugins/airplay';
import chromecastPlugin from '@flowplayer/player/plugins/chromecast';
import cuepointsPlugin from '@flowplayer/player/plugins/cuepoints';
import googleAnalyticsPlugin from '@flowplayer/player/plugins/google-analytics';
import hlsPlugin from '@flowplayer/player/plugins/hls';
import speedPlugin from '@flowplayer/player/plugins/speed';
import subtitlesPlugin from '@flowplayer/player/plugins/subtitles';
import classnames from 'classnames';
import React, { createRef } from 'react';

import '@flowplayer/player/flowplayer.css';
import './FlowPlayer.scss';
import {
	FlowplayerInstance,
	FlowPlayerPropsSchema,
	FlowPlayerState,
	GoogleAnalyticsEvent,
} from './FlowPlayer.types';

flowplayer(
	airplayPlugin,
	chromecastPlugin,
	googleAnalyticsPlugin,
	hlsPlugin,
	speedPlugin,
	subtitlesPlugin,
	cuepointsPlugin
);

export const convertGAEventsArrayToObject = (googleAnalyticsEvents: GoogleAnalyticsEvent[]) => {
	return googleAnalyticsEvents.reduce((acc: any, curr: GoogleAnalyticsEvent) => {
		acc[curr] = curr;

		return acc;
	}, {});
};

export class FlowPlayer extends React.Component<FlowPlayerPropsSchema, FlowPlayerState> {
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

	private static noop() {
		// do nothing.
	}

	private reInitFlowPlayer(props: FlowPlayerPropsSchema) {
		this.destroyPlayer();

		if (!this.videoContainerRef.current) {
			return;
		}

		const flowplayerInstance: Player = flowplayer(
			this.videoContainerRef.current as HTMLElement,
			{
				// DATA
				src: props.src,
				token: props.token,
				poster: props.poster,

				// CONFIGURATION
				autoplay: props.autoplay,
				ui: (flowplayer as any).ui.LOGO_ON_RIGHT | (flowplayer as any).ui.USE_DRAG_HANDLE,
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
					app: chromecastPlugin.apps.STABLE,
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
			} as Config
		);

		if (!flowplayerInstance) {
			console.error('Failed to init flow player');
			return;
		}

		flowplayerInstance.on('error', (err: unknown) => {
			console.error(err);
		});

		this.drawCustomElements(flowplayerInstance);

		flowplayerInstance.on('playing', () => {
			if (!this.state.startedPlaying) {
				// First time playing the video
				if (this.props.onPlay) {
					this.props.onPlay();
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
