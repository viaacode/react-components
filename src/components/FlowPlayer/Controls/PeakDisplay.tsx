import type { FC } from 'react';
import { AudioWaveFormDisplay } from '../../AudioWaveFormDisplay/AudioWaveFormDisplay';
import { WAVE_FORM_PADDING_X_PERCENT } from '../../AudioWaveFormDisplay/AudioWaveFormDisplay.helpers';
import { clamp } from '../../../utils/clamp';

export interface PeakDisplayProps {
	percentagePlayed: number; // 0-1
	colorActive?: string;
	colorInactive?: string;
	colorBackground?: string;
}

// Two waveform copies, "not yet played" and "played", the second revealed via clip-path as
// `percentagePlayed` grows (same technique as ProgressBar.tsx's own label overlay).
export const PeakDisplay: FC<PeakDisplayProps> = ({
	percentagePlayed,
	colorActive,
	colorInactive,
	colorBackground,
}) => {
	const contentSpan = 100 - WAVE_FORM_PADDING_X_PERCENT * 2;
	const revealPct = WAVE_FORM_PADDING_X_PERCENT + clamp(percentagePlayed, 0, 1) * contentSpan;

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
