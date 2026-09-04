import type { FlowplayerPlugin } from './FlowPlayer.types';

export const DELAY_BETWEEN_PLAYLIST_VIDEOS = 7;

// `.fp-middle` (native's click-to-toggle-play target, also holds the `.fp-switch` flash icon
// custom mode relies on) is deliberately excluded - custom controls hide native's chrome behind
// their own bar but keep `.fp-middle` visible/working.
export const NATIVE_CONTROLS_HIDE_SELECTOR = '.fp-controls, .fp-header, .fp-error';

// For the postMessage embed API (FlowPlayer.commands.ts) - unlike the selector above, this
// includes `.fp-middle`, since a host app hiding controls remotely expects no click-to-play left active.
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
