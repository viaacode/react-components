import type { FlowPlayerControlsColors, FlowPlayerControlsLabels } from '../FlowPlayer.types';

export const DEFAULT_VOLUME_STEPS = 10;
export const DEFAULT_AUTO_HIDE_DELAY_MS = 3000;
export const DEFAULT_PERSISTENCE_KEY_PREFIX = 'meemoo-flowplayer';

// Sensible defaults only - not "the design". A real theme is applied via the `colors` config.
export const defaultControlsColors: Required<FlowPlayerControlsColors> = {
	backgroundColor: '#000000',
	foregroundColor: '#FFFFFF',
	accentColor: '#00c8aa',
	flyoutBackground: '#FFFFFF',
	flyoutForeground: '#000000',
};

// Matches the rest of FlowPlayer.consts.ts: Dutch defaults, overridable by the consumer.
export const defaultControlsLabels: Required<FlowPlayerControlsLabels> = {
	play: 'Afspelen',
	pause: 'Pauzeren',
	mute: 'Dempen',
	unmute: 'Dempen opheffen',
	volume: 'Volume',
	fullscreenEnter: 'Volledig scherm',
	fullscreenExit: 'Volledig scherm sluiten',
	subtitles: 'Ondertitels',
	subtitlesOff: 'Uit',
	speed: 'Snelheid',
	progressBar: 'Voortgang',
};
