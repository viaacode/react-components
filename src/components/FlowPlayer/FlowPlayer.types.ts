import type { Config } from '@flowplayer/player';
import type { Avo } from '@viaa/avo2-types';
import type { ReactElement, ReactNode } from 'react';

import type { DefaultComponentProps } from '../../types';

export type FlowplayerPlugin =
	| 'subtitles'
	| 'hls'
	| 'cuepoints'
	| 'keyboard'
	| 'playlist'
	| 'speed'
	| 'audio'
	| 'ga'
	| 'chromecast'
	| 'airplay';

export type GoogleAnalyticsEvent =
	| 'fullscreen_enter'
	| 'fullscreen_exit'
	| 'video_player_load'
	| 'video_start'
	| 'video_click_play'
	| 'video_pause'
	| 'video_resume'
	| 'video_mute'
	| 'video_unmute'
	| 'video_25_percent'
	| 'video_50_percent'
	| 'video_75_percent'
	| 'video_complete'
	| 'live_start'
	| 'live_click_play'
	| 'live_pause'
	| 'live_resume'
	| 'live_mute'
	| 'live_unmute'
	| 'live_complete'
	| 'ad_start_preroll'
	| 'ad_start_midroll'
	| 'ad_start_postroll'
	| 'ad_completed_preroll'
	| 'ad_completed_midroll'
	| 'ad_completed_postroll'
	| 'ad_skipped_preroll'
	| 'ad_skipped_midroll'
	| 'ad_skipped_postroll';

export type Cuepoints = {
	startTime: number | null | undefined;
	endTime: number | null | undefined;
}[];

export type FlowplayerConfigWithPlugins = Config & {
	cuepoints?: Cuepoints;
	subtitles?: { tracks: FlowplayerTrackSchema[] };
	chromecast?: any;
	keyboard?: any;
	speed?: any;
	plugins: FlowplayerPlugin[];
};

export interface FlowplayerTrackSchema {
	crossorigin?: 'use-credentials' | 'anonymous';
	default: boolean;
	id?: string;
	kind?: 'captions' | 'subtitles' | 'descriptions';
	label: string;
	lang?: string;
	src: string;
}

export interface FlowplayerSourceItem {
	src: string;
	title: string;
	category: Avo.ContentType.English;
	provider: string;
	poster: string;
	cuepoints?: Cuepoints;
}

export interface FlowplayerCommand {
	event: string;
	id: string | undefined; // Same id as received to confirm handling of the command
	payload?: any;
	result?: any;
}

export type FlowplayerSourceListSchema = {
	type: 'flowplayer/playlist';
	items: FlowplayerSourceItem[];
};
export type FlowplayerSourceList = FlowplayerSourceListSchema;

export interface FlowPlayerProps extends DefaultComponentProps {
	children?: ReactNode;
	src: string | { type: string; src: string }[] | FlowplayerSourceListSchema;
	type: 'video' | 'audio';
	poster?: string;
	logo?: string;
	title?: string;
	metadata?: string[];
	start?: number | null;
	end?: number | null;
	speed?: {
		options: number[];
		labels: string[];
	};
	token?: string;
	dataPlayerId?: string;
	autoplay?: boolean;
	pause?: boolean;
	fullscreen?: boolean;
	onPlay?: (src: string) => void;
	onPause?: () => void;
	onEnded?: () => void;
	onTimeUpdate?: (time: number) => void;
	preload?: 'none' | 'auto' | 'metadata';
	plugins?: FlowplayerPlugin[];
	subtitles?: FlowplayerTrackSchema[];
	playlistScrollable?: boolean;
	renderPlaylistTile?: (item: FlowplayerSourceItem) => ReactNode;
	canPlay?: boolean; // Indicates if the video can play at this time. Eg: will be set to false if a modal is open in front of the video player
	className?: string;
	customControls?: ReactElement;
	waveformData?: number[];
	googleAnalyticsId?: string;
	googleAnalyticsEvents?: GoogleAnalyticsEvent[];
	googleAnalyticsTitle?: string;
	seekable?: Config['seekable'];
	ui?: Config['ui'];
	controls?: Config['controls'];
	peakColorBackground?: string; // eg: '#FFFFFF'
	peakColorInactive?: string; // eg: '#ADADAD'
	peakColorActive?: string; // eg: '#00C8AA'
	peakHeightFactor?: number; // Ratio to make the peaks less or more high. Defaults to 1
}
