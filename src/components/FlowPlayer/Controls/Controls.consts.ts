import { Locale } from '../../../types';
import {
	type FlowPlayerControlsColors,
	FlowPlayerControlsLabelKey,
	type FlowPlayerControlsLabels,
} from '../FlowPlayer.types';

export const DEFAULT_AUTO_HIDE_DELAY_MS = 3000;
export const DEFAULT_SHOW_PEAK = true;
export const DEFAULT_PEAK_MODE = 'data' as const;

/** Whether the generic built-in waveform (`PeakDisplay`) should render - shared by ControlBar.tsx and FlowPlayer.internal.tsx so they can't drift. */
export function isGenericPeakMode(
	showPeak: boolean | undefined,
	peakMode: 'data' | 'generic' | undefined
): boolean {
	return (showPeak ?? DEFAULT_SHOW_PEAK) && (peakMode ?? DEFAULT_PEAK_MODE) === 'generic';
}

// Sensible defaults only - not "the design". A real theme is applied via the `colors` config.
export const defaultControlsColors: Required<FlowPlayerControlsColors> = {
	backgroundColor: '#000000',
	foregroundColor: '#FFFFFF',
	progressColor: '#00CCA9',
	accentColor: '#009991',
	cuepointColor: '#009991',
};

// Base label sets per locale - the consumer's `labels` config overrides individual keys on top
// of whichever set `locale` resolves to. Defaults to nl, matching the rest of FlowPlayer.consts.ts.
export const FLOW_PLAYER_CONTROLS_LABELS: Record<Locale, FlowPlayerControlsLabels> = {
	[Locale.nl]: {
		[FlowPlayerControlsLabelKey.Play]: 'Afspelen',
		[FlowPlayerControlsLabelKey.Pause]: 'Pauzeren',
		[FlowPlayerControlsLabelKey.Mute]: 'Dempen',
		[FlowPlayerControlsLabelKey.Unmute]: 'Dempen opheffen',
		[FlowPlayerControlsLabelKey.Volume]: 'Volume',
		[FlowPlayerControlsLabelKey.FullscreenEnter]: 'Volledig scherm',
		[FlowPlayerControlsLabelKey.FullscreenExit]: 'Volledig scherm sluiten',
		[FlowPlayerControlsLabelKey.Subtitles]: 'Ondertitels',
		[FlowPlayerControlsLabelKey.SubtitlesOff]: 'Uit',
		[FlowPlayerControlsLabelKey.Speed]: 'Snelheid',
		[FlowPlayerControlsLabelKey.ProgressBar]: 'Voortgang',
	},
	[Locale.en]: {
		[FlowPlayerControlsLabelKey.Play]: 'Play',
		[FlowPlayerControlsLabelKey.Pause]: 'Pause',
		[FlowPlayerControlsLabelKey.Mute]: 'Mute',
		[FlowPlayerControlsLabelKey.Unmute]: 'Unmute',
		[FlowPlayerControlsLabelKey.Volume]: 'Volume',
		[FlowPlayerControlsLabelKey.FullscreenEnter]: 'Enter fullscreen',
		[FlowPlayerControlsLabelKey.FullscreenExit]: 'Exit fullscreen',
		[FlowPlayerControlsLabelKey.Subtitles]: 'Subtitles',
		[FlowPlayerControlsLabelKey.SubtitlesOff]: 'Off',
		[FlowPlayerControlsLabelKey.Speed]: 'Speed',
		[FlowPlayerControlsLabelKey.ProgressBar]: 'Progress',
	},
};
