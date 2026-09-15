import clsx from 'clsx';
import type { FC, KeyboardEvent } from 'react';
import { useDragValue } from './use-drag-value';

// Flowplayer renders 6 ticks on a tiny player, 8 on a small one and 10 otherwise - a responsive
// concern our fixed-size flyout doesn't have, so we always use its full-size count.
const DEFAULT_VOLUME_STEPS = 10;

// Flowplayer's keyboard plugin moves a focused volume slider by 0.15 per arrow press.
const NATIVE_VOLUME_KEY_STEP = 15;

// Not `utils/clamp`: that helper drops its upper bound whenever it actually applies.
const clampVolume = (volume: number) => Math.min(Math.max(volume, 0), 100);

export interface VolumeBarsProps {
	value: number; // 0-100
	steps?: number;
	onChange: (value: number) => void;
	ariaLabel: string;
}

/**
 * The row of bars IS the interactive control (click/drag anywhere along it sets the volume).
 *
 * Ported from Flowplayer's own `FlowplayerVolumeBar`: the value it carries is continuous, and the
 * bars are only a discrete *display* of it - hence the rounded fill below rather than snapping the
 * value itself to a step.
 */
export const VolumeBars: FC<VolumeBarsProps> = ({
	value,
	steps = DEFAULT_VOLUME_STEPS,
	onChange,
	ariaLabel,
}) => {
	const { containerRef, dragHandlers } = useDragValue({ onChange });

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		switch (event.key) {
			case 'ArrowUp':
			case 'ArrowRight':
				onChange(clampVolume(value + NATIVE_VOLUME_KEY_STEP));
				break;
			case 'ArrowDown':
			case 'ArrowLeft':
				onChange(clampVolume(value - NATIVE_VOLUME_KEY_STEP));
				break;
			default:
				// Flowplayer has no Home/End volume shortcut, so neither do we.
				return;
		}
		event.preventDefault();
		// Flowplayer's global keyboard plugin adjusts volume on ArrowUp/Down and seeks on
		// ArrowLeft/Right from anywhere in the player - without this it would double-apply.
		event.stopPropagation();
	};

	const filledCount = Math.round((value / 100) * steps);

	return (
		<div
			ref={containerRef}
			className="c-flowplayer-volume-bars"
			role="slider"
			tabIndex={0}
			aria-orientation="horizontal"
			aria-label={ariaLabel}
			aria-valuemin={0}
			// Flowplayer's own 0-1 scale, which needs the percentage in `aria-valuetext` to be
			// announceable ("40%" rather than "0.4").
			aria-valuemax={1}
			aria-valuenow={value / 100}
			aria-valuetext={`${Math.round(value)}%`}
			onKeyDown={handleKeyDown}
			{...dragHandlers}
		>
			{Array.from({ length: steps }).map((_, index) => (
				<span
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length bar row, index is the identity
					key={index}
					className={clsx('c-flowplayer-volume-bars__bar', {
						'c-flowplayer-volume-bars__bar--filled': index < filledCount,
					})}
				/>
			))}
		</div>
	);
};
