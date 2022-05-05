import { ReactElement } from 'react';

import { DefaultComponentProps } from '../../types';

export enum GoogleAnalyticsEvent {
	FullscreenEnter = 'fullscreen_enter',
	FullscreenExit = 'fullscreen_exit',
	VideoPlayerLoad = 'video_player_load',
	VideoStart = 'video_start',
	videoClickPlay = 'video_click_play',
	VideoPause = 'video_pause',
	VideoResume = 'video_resume',
	VideoMute = 'video_mute',
	VideoUnmute = 'video_unmute',
	Video25Percent = 'video_25_percent',
	Video50Percent = 'video_50_percent',
	Video75Percent = 'video_75_percent',
	VideoComplete = 'video_complete',
	LiveStart = 'live_start',
	LiveClickPlay = 'live_click_play',
	LivePause = 'live_pause',
	LiveResume = 'live_resume',
	LiveMute = 'live_mute',
	LiveUnmute = 'live_unmute',
	LiveComplete = 'live_complete',
	AdStartPreroll = 'ad_start_preroll',
	AdStartMidroll = 'ad_start_midroll',
	AdStartPostroll = 'ad_start_postroll',
	AdCompletedPreroll = 'ad_completed_preroll',
	AdCompletedMidroll = 'ad_completed_midroll',
	AdCompletedPostroll = 'ad_completed_postroll',
	AdSkippedPreroll = 'ad_skipped_preroll',
	AdSkippedMidroll = 'ad_skipped_midroll',
	AdSkippedPostroll = 'ad_skipped_postroll',
}

export interface FlowplayerTrack {
	crossorigin?: 'use-credentials' | 'anonymous';
	default: boolean;
	id?: string;
	kind?: 'captions' | 'subtitles' | 'descriptions';
	label: string;
	lang?: string;
	src: string;
}

export interface FlowplayerInstance extends HTMLVideoElement {
	destroy: () => void;
	on: (eventName: string, handlerFunction: (...args: unknown[]) => void) => void;
	emit: (eventName: string, eventObj: unknown) => void;
}

export interface FlowPlayerProps extends DefaultComponentProps {
	src: string | { type: string; src: string }[];
	poster?: string;
	logo?: string;
	title?: string;
	metadata?: string[];
	start?: number | null;
	end?: number | null;
	token?: string;
	dataPlayerId?: string;
	autoplay?: boolean;
	pause?: boolean;
	fullscreen?: boolean;
	seekTime?: number;
	onPlay?: () => void;
	onPause?: () => void;
	onEnded?: () => void;
	onTimeUpdate?: (time: number, percentage: number) => void;
	onToggleFullscreen?: (fullscreen: boolean) => void;
	preload?: 'none' | 'auto' | 'metadata';
	plugins?: ('speed' | 'subtitles' | 'chromecast' | 'cuepoints' | 'hls' | 'ga' | 'audio')[];
	subtitles?: FlowplayerTrack[];
	canPlay?: boolean; // Indicates if the video can play at this type. Eg: will be set to false if a modal is open in front of the video player
	className?: string;
	customControls?: ReactElement;
	waveformData?: number[];
	googleAnalyticsId?: string;
	googleAnalyticsEvents?: GoogleAnalyticsEvent[];
	googleAnalyticsTitle?: string;
}

export interface FlowPlayerState {
	flowPlayerInstance: FlowplayerInstance | null;
	startedPlaying: boolean;
}
