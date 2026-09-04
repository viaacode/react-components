import clsx from 'clsx';
import { type CSSProperties, type FC, memo } from 'react';
import { getWaveFormBars, getWaveFormViewBox, WAVE_FORM_STROKE_WIDTH } from './AudioWaveFormDisplay.helpers';
import type { AudioWaveFormDisplayProps } from './AudioWaveFormDisplay.types';

import './AudioWaveFormDisplay.scss';

// Memoized so PeakDisplay's static "inactive" waveform layer (unchanging colors/size) skips
// reconciling its ~30-60 <line> elements on every playback timeupdate tick, which only changes
// the sibling "active" layer's clip-path, not either layer's own props.
export const AudioWaveFormDisplay: FC<AudioWaveFormDisplayProps> = memo(function AudioWaveFormDisplay({
	className,
	rootClassName: root = 'c-audio-wave-form-display',
	ariaLabel,
	waveColor,
	backgroundColor,
	size = 'small',
}) {
	const bars = getWaveFormBars(size);
	const viewBox = getWaveFormViewBox(size);

	return (
		<div
			role="img"
			aria-label={ariaLabel}
			className={clsx(root, `${root}--${size}`, className)}
			style={
				{
					'--c-audio-wave-form-display-bg': backgroundColor,
					'--c-audio-wave-form-display-wave-color': waveColor,
				} as CSSProperties
			}
		>
			{/* Plain box for consumers to hook a hover-zoom transform onto: transitioning `transform`
			on an <svg> itself doesn't animate smoothly in every browser, unlike an ordinary element. */}
			<div className="c-audio-wave-form-display__scaler">
				<svg
					className="c-audio-wave-form-display__svg"
					viewBox={viewBox}
					preserveAspectRatio="xMidYMid meet"
					aria-hidden="true"
				>
					{bars.map((bar, index) => (
						<line
							// biome-ignore lint/suspicious/noArrayIndexKey: decorative, no identity of its own
							key={index}
							className="c-audio-wave-form-display__bar"
							x1={bar.x}
							x2={bar.x}
							y1={bar.y1}
							y2={bar.y2}
							strokeWidth={WAVE_FORM_STROKE_WIDTH}
							strokeLinecap="round"
						/>
					))}
				</svg>
			</div>
		</div>
	);
});
