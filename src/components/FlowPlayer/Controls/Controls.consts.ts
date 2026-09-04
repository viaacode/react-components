import type { FlowPlayerControlsColors, FlowPlayerControlsLabels } from '../FlowPlayer.types';

export const DEFAULT_VOLUME_STEPS = 10;
export const DEFAULT_AUTO_HIDE_DELAY_MS = 3000;
export const DEFAULT_PERSISTENCE_KEY_PREFIX = 'meemoo-flowplayer';
export const DEFAULT_SHOW_PEAK = true;
export const DEFAULT_PEAK_MODE = 'data' as const;

/**
 * Whether the generic built-in waveform (`PeakDisplay`) should render for this config. Shared
 * between ControlBar.tsx (which renders `PeakDisplay` itself) and FlowPlayer.internal.tsx (which
 * needs the same answer to decide whether to cancel Flowplayer's own poster background-image) so
 * the two can never drift on what "generic peak mode" means.
 */
export function isGenericPeakMode(showPeak: boolean | undefined, peakMode: 'data' | 'generic' | undefined): boolean {
	return (showPeak ?? DEFAULT_SHOW_PEAK) && (peakMode ?? DEFAULT_PEAK_MODE) === 'generic';
}

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
