import type { FC } from 'react';
import { AudioWaveFormDisplay } from '../../AudioWaveFormDisplay/AudioWaveFormDisplay';
import { WAVE_FORM_PADDING_X_PERCENT } from '../../AudioWaveFormDisplay/AudioWaveFormDisplay.helpers';

export interface PeakDisplayProps {
	percentagePlayed: number; // 0-1
	colorActive?: string;
	colorInactive?: string;
	colorBackground?: string;
}

// `peakMode: 'generic'` (see FlowPlayer.types.ts) always renders this one built-in waveform
// rather than accepting an arbitrary visual from the caller - two copies, "not yet played" and
// "played", the second revealed via clip-path as `percentagePlayed` grows (the same technique
// already used in ProgressBar.tsx for its light/dark label overlay). `AudioWaveFormDisplay`'s own
// horizontal padding (`WAVE_FORM_PADDING_X_PERCENT`) is baked in here rather than left
// caller-configurable, since this is always the same component now. Always rendered at `size:
// "large"` - this is only ever used for the active, playing FlowPlayer view.
export const PeakDisplay: FC<PeakDisplayProps> = ({
	percentagePlayed,
	colorActive,
	colorInactive,
	colorBackground,
}) => {
	const contentSpan = 100 - WAVE_FORM_PADDING_X_PERCENT * 2;
	const revealPct = WAVE_FORM_PADDING_X_PERCENT + Math.max(0, Math.min(1, percentagePlayed)) * contentSpan;

	return (
		<div className="c-flowplayer-peak-image">
			<div className="c-flowplayer-peak-image__layer c-flowplayer-peak-image__layer--inactive">
				<AudioWaveFormDisplay size="large" waveColor={colorInactive} backgroundColor={colorBackground} />
			</div>
			<div
				className="c-flowplayer-peak-image__layer c-flowplayer-peak-image__layer--active"
				style={{ clipPath: `inset(0 ${100 - revealPct}% 0 0)` }}
			>
				<AudioWaveFormDisplay size="large" waveColor={colorActive} backgroundColor={colorBackground} />
			</div>
		</div>
	);
};
