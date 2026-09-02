import type { Config } from '@flowplayer/player';
import type { AvoContentTypeEnglish } from '@viaa/avo2-types';
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
	category: AvoContentTypeEnglish;
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
	muted?: boolean;
	onMutedChange?: (muted: boolean) => void;
	pause?: boolean;
	fullscreen?: boolean;
	onPlay?: (src: string) => void;
	onPause?: () => void;
	onEnded?: () => void;
	onTimeUpdate?: (time: number) => void;
	onMetadataLoaded?: (evt: Event) => void;
	onError?: () => void;
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
	enableRestartCuePointsButton?: boolean;

	// Custom control bar (opt-in, default behaviour is unaffected)
	controlsVariant?: 'native' | 'custom'; // default 'native'
	customControlsConfig?: FlowPlayerCustomControlsConfig;
}

export interface FlowPlayerCustomControlsConfig {
	// Per-control visibility. Subtitles/speed default to true only when the corresponding
	// data (subtitles tracks / speed options) is actually present.
	showPlayPause?: boolean;
	showProgressBar?: boolean;
	showTimestamps?: boolean;
	showVolume?: boolean;
	showSubtitles?: boolean;
	showFullscreen?: boolean;
	showSpeed?: boolean;
	showPeak?: boolean; // audio only

	volumeSteps?: number; // discrete bars in the volume flyout, default 10

	// 'data' (default): the real numeric-peak-data canvas, unchanged regardless of controls mode.
	// 'generic': a decorative, always-the-same waveform (`AudioWaveFormDisplay`, which sizes
	// itself off its own rendered box) instead of one driven by real audio data - for content with
	// no peak data of its own. Colors below mirror the top-level `peakColor*` props' naming/
	// meaning, just applied to this visual instead of the canvas; `active`/`inactive` are revealed
	// via the same clip-path progress technique already used for the progress bar's own light/dark
	// label overlay.
	peakMode?: 'data' | 'generic'; // default 'data'
	peakColorActive?: string; // eg: '#00C8AA'
	peakColorInactive?: string; // eg: '#ADADAD'
	peakColorBackground?: string; // eg: '#FFFFFF'

	autoHideDelayMs?: number; // default 3000, 0 disables auto-hide
	// Only governs the subtitle on/off preference - volume/mute already persist via
	// Flowplayer's own internal storage regardless of this flag.
	persistPreferences?: boolean; // default true
	persistenceKeyPrefix?: string; // default 'meemoo-flowplayer'

	// Native mode only ever shows the title/logo overlay in fullscreen (see FlowPlayer.scss) - a
	// normal embedded player essentially never displays it. Custom mode keeps that same
	// conservative default (false); opt in for a demo/player-page context where showing it,
	// fading with the rest of the bar, is actually wanted.
	showTitleOverlay?: boolean; // default false

	colors?: FlowPlayerControlsColors;
	labels?: FlowPlayerControlsLabels;
}

export interface FlowPlayerControlsColors {
	backgroundColor?: string; // control bar background + button backgrounds
	foregroundColor?: string; // icon color + timestamp text color, against `backgroundColor`
	accentColor?: string; // progress fill/handle, an active/highlighted button, filled volume bars
	flyoutBackground?: string; // volume/subtitles/speed popover surface
	// Text/icon color *inside* a flyout popover, against `flyoutBackground` - deliberately
	// separate from `foregroundColor`: that one is meant to read against the dark bar, this one
	// against the (by default light) popover, and reusing one token for both goes invisible the
	// moment the two backgrounds aren't the same shade (confirmed live: white text on a white
	// popover). Defaults dark to match `flyoutBackground`'s own default of white.
	flyoutForeground?: string;
}

export interface FlowPlayerControlsLabels {
	play?: string;
	pause?: string;
	mute?: string;
	unmute?: string;
	volume?: string;
	fullscreenEnter?: string;
	fullscreenExit?: string;
	subtitles?: string;
	subtitlesOff?: string;
	speed?: string;
	progressBar?: string;
}
