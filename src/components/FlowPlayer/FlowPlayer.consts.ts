import type { FlowplayerPlugin } from './FlowPlayer.types';

export const DELAY_BETWEEN_PLAYLIST_VIDEOS = 7;

// `.fp-middle` is deliberately NOT in this list - it's the element Flowplayer's own native UI
// bundle attaches its click-anywhere-on-the-video-to-toggle-play listener to, so `display: none`
// on it (via `.fp-controls-hidden`) would silently kill that click-to-toggle behaviour. It also
// contains `.fp-switch` (the native play/pause flash icon), which custom mode relies on too - see
// useFlowplayerState.ts's `transitionState` call - so it stays fully visible while custom controls
// are active. Used only by FlowPlayer.internal.tsx to hide Flowplayer's own chrome behind our
// custom control bar - NOT by the postMessage embed API, which has no custom bar to fall back on
// and needs `.fp-middle` hidden too (see EMBED_CONTROLS_HIDE_SELECTOR below).
export const NATIVE_CONTROLS_HIDE_SELECTOR = '.fp-controls, .fp-header, .fp-error';

// Used by FlowPlayer.commands.ts's postMessage `set_controls`/`initialize(controls: false)`
// handling. Unlike NATIVE_CONTROLS_HIDE_SELECTOR above, this includes `.fp-middle` - a host app
// hiding controls via postMessage expects to fully own interaction with the video, with no
// click-anywhere-to-toggle-play left active underneath.
export const EMBED_CONTROLS_HIDE_SELECTOR = '.fp-controls, .fp-middle, .fp-header, .fp-error';

export const dutchFlowplayerTranslations = {
	ads: { ad: 'Ad', ads: 'Ads', advertisement: 'Advertentie', indicator: 'Ads' },
	audio: { button_txt: 'Audio', menu_title: 'Audio' },
	core: {
		exit_fullscreen: 'Sluit fullscreen',
		fullscreen: 'Fullscreen',
		mute: 'Dempen',
		pause: 'Pause',
		play: 'Play',
		unmute: 'Dempen opheffen',
		volume: 'Volume',
	},
	ovp: { starting_in: 'Start over' },
	playlist: { cancel: 'Annuleren', up_next: 'Volgende' },
	qsel: { menu_title: 'Kwaliteit' },
	share: {
		clipboard_failure: 'Toegang tot klembord mislukt',
		clipboard_success: 'De tekst staat nu op je klembord',
		embed: 'Embed',
		link: 'Link',
		menu_title: 'Deel',
	},
	speed: { menu_title: 'Snelheid' },
};

export const ALL_FLOWPLAYER_PLUGINS = [
	'subtitles',
	'cuepoints',
	'hls',
	'ga',
	'speed',
	'audio',
	'keyboard',
	'playlist',
	// 'chromecast', 'airplay', // Disabled for now for video security: https://meemoo.atlassian.net/browse/AVO-1859
] as FlowplayerPlugin[];
