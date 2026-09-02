import type { FC, KeyboardEvent } from 'react';
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
	const { containerRef, dragHandlers } = useDragValue({
		orientation: 'horizontal',
		onChange: (percentage) => {
			const stepIndex = Math.round((percentage / 100) * steps);
			onChange(Math.max(0, Math.min(100, (stepIndex / steps) * 100)));
		},
	});

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		const stepSize = 100 / steps;
		switch (event.key) {
			case 'ArrowUp':
			case 'ArrowRight':
				onChange(Math.min(100, value + stepSize));
				break;
			case 'ArrowDown':
			case 'ArrowLeft':
				onChange(Math.max(0, value - stepSize));
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
