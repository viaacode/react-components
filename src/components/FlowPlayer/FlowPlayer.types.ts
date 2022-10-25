import { Config } from '@flowplayer/player';
import { ReactElement, ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export type FlowPlayerPlugin =
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

export type FlowPlayerConfigWithPlugins = Config & {
	cuepoints?: Cuepoints;
	subtitles?: { tracks: FlowPlayerTrack[] };
	chromecast?: any;
	keyboard?: any;
	speed?: any;
	plugins: FlowPlayerPlugin[];
};

export interface FlowPlayerTrack {
	crossorigin?: 'use-credentials' | 'anonymous';
	default: boolean;
	id?: string;
	kind?: 'captions' | 'subtitles' | 'descriptions';
	label: string;
	lang?: string;
	src: string;
}

export type EnglishContentType =
	| 'collection'
	| 'item'
	| 'bundle'
	| 'video'
	| 'audio'
	| 'search'
	| 'searchquery';

export interface FlowPlayerSourceItem {
	src: string;
	title: string;
	category: EnglishContentType;
	provider: string;
	poster: string;
	cuepoints?: Cuepoints;
}

export type FlowPlayerSourceList = {
	type: 'flowplayer/playlist';
	items: FlowPlayerSourceItem[];
};

export interface FlowPlayerProps extends DefaultComponentProps {
	src: string | { type: string; src: string }[] | FlowPlayerSourceList;
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
	plugins?: FlowPlayerPlugin[];
	subtitles?: FlowPlayerTrack[];
	playlistScrollable?: boolean;
	renderPlaylistTile?: (item: FlowPlayerSourceItem) => ReactNode;
	canPlay?: boolean; // Indicates if the video can play at this time. Eg: will be set to false if a modal is open in front of the video player
	className?: string;
	customControls?: ReactElement;
	waveformData?: number[];
	googleAnalyticsId?: string;
	googleAnalyticsEvents?: GoogleAnalyticsEvent[];
	googleAnalyticsTitle?: string;
}
