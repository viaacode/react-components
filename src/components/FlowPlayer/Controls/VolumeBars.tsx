import { type FC, type KeyboardEvent, useCallback } from 'react';
import { clamp } from '../../../utils/clamp';
import { useDragValue } from './use-drag-value';

export interface VolumeBarsProps {
	value: number; // 0-100
	steps?: number;
	onChange: (value: number) => void;
	accentColor: string;
	unfilledColor: string;
	ariaLabel: string;
}

/**
 * The row of bars IS the interactive control (click/drag sets discrete volume steps), not a
 * decorative icon next to a separate slider. The bars are laid out left-to-right, so the drag
 * axis has to be horizontal too - it was wired up as vertical before, which read the click/drag
 * position along the container's ~20px height instead of its full width, making the actual step
 * you landed on nearly random relative to where you clicked.
 */
export const VolumeBars: FC<VolumeBarsProps> = ({
	value,
	steps = 10,
	onChange,
	accentColor,
	unfilledColor,
	ariaLabel,
}) => {
	const handleDragChange = useCallback(
		(percentage: number) => {
			const stepIndex = Math.round((percentage / 100) * steps);
			onChange(clamp((stepIndex / steps) * 100, 0, 100));
		},
		[steps, onChange]
	);

	const { containerRef, dragHandlers } = useDragValue({
		orientation: 'horizontal',
		onChange: handleDragChange,
	});

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		const stepSize = 100 / steps;
		switch (event.key) {
			case 'ArrowUp':
			case 'ArrowRight':
				onChange(clamp(value + stepSize, 0, 100));
				break;
			case 'ArrowDown':
			case 'ArrowLeft':
				onChange(clamp(value - stepSize, 0, 100));
				break;
			case 'Home':
				onChange(0);
				break;
			case 'End':
				onChange(100);
				break;
			default:
				return;
		}
		event.preventDefault();
		// Flowplayer's own global keyboard plugin (bound to `document`) also matches any focused
		// element with `aria-valuenow` on arrow keys, but only special-cases its own `.fp-volume`/
		// `.fp-timeline` elements - anything else (like this slider) falls through to its generic
		// handling and ends up seeking the video or double-adjusting its own volume state. Stop
		// the event here so it never reaches that listener.
		event.stopPropagation();
	};

	return (
		<div
			ref={containerRef}
			className="c-flowplayer-volume-bars"
			role="slider"
			tabIndex={0}
			aria-orientation="horizontal"
			aria-label={ariaLabel}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={Math.round(value)}
			onKeyDown={handleKeyDown}
			{...dragHandlers}
		>
			{Array.from({ length: steps }).map((_, index) => {
				const filled = value >= ((index + 1) / steps) * 100;
				return (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length bar row, index is the identity
						key={index}
						className="c-flowplayer-volume-bars__bar"
						style={{ backgroundColor: filled ? accentColor : unfilledColor }}
					/>
				);
			})}
		</div>
	);
};
