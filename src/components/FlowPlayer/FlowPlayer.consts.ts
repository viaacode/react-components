import type { FlowplayerPlugin } from './FlowPlayer.types';

export const DELAY_BETWEEN_PLAYLIST_VIDEOS = 7;

// `.fp-middle` is deliberately NOT in this list - it's the element Flowplayer's own native UI
// bundle attaches its click-anywhere-on-the-video-to-toggle-play listener to, so `display: none`
// on it (via `.fp-controls-hidden`) would silently kill that click-to-toggle behaviour. It also
// contains `.fp-switch` (the native play/pause flash icon), which custom mode relies on too - see
// useFlowplayerState.ts's `transitionState` call - so it stays fully visible, exactly like native
// mode. Shared between FlowPlayer.internal.tsx (imperative hide on init/variant change) and
// FlowPlayer.commands.ts (the postMessage embed API's own hide-controls command) so the two never
// diverge on what "hidden" means again.
export const NATIVE_CONTROLS_HIDE_SELECTOR = '.fp-controls, .fp-header, .fp-error';

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
