import { type FC, type KeyboardEvent, useCallback } from 'react';
import { formatDuration } from '../../../utils/formatters/duration';
import type { ProgressBarProps } from './ProgressBar.types';
import { useDragValue } from './use-drag-value';

// Adaptive, unpadded (e.g. "3:45", "1:03:45") - a fixed-width "00:03:45" reads oddly for a live
// progress readout, which is short most of the time.
const formatProgressTime = (seconds: number) =>
	formatDuration(seconds, { includeHours: 'auto', padLeadingUnit: false });

export const ProgressBar: FC<ProgressBarProps> = ({
	currentTime,
	duration,
	bufferedEnd,
	onSeek,
	onSeekStart,
	onSeekEnd,
	showTimestamps = true,
	cuepoints,
	accentColor,
	foregroundColor,
	ariaLabel,
}) => {
	const playedPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
	const bufferedPct = duration > 0 ? Math.min(100, (bufferedEnd / duration) * 100) : 0;

	const handleDragChange = useCallback(
		(percentage: number) => {
			if (duration > 0) {
				onSeek((percentage / 100) * duration);
			}
		},
		[duration, onSeek]
	);

	const { containerRef, dragHandlers } = useDragValue({
		orientation: 'horizontal',
		onDragStart: onSeekStart,
		onDragEnd: onSeekEnd,
		onChange: handleDragChange,
	});

	// ArrowLeft/ArrowRight are deliberately not handled here - Flowplayer's own global `keyboard`
	// plugin (bound to `document`, always active, can't be disabled per-instance) already resolves
	// "the active player" and calls its own `enqueueSeek()` on arrow keys whenever
	// `document.activeElement` has an `aria-valuenow` attribute - true for this track (`role`
	// `="slider"`) - producing the native "+5/+10" overlay and accumulate-then-commit behaviour for
	// free. Handling it here too would just double-fire both (confirmed live). useKeyboardShortcuts.ts
	// covers the rest of the bar, where native's own listener does NOT recognise focus (see its own
	// comment for why). Home/End have no native equivalent, so those still jump directly.
	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (duration <= 0) {
			return;
		}
		switch (event.key) {
			case 'Home':
				onSeek(0);
				break;
			case 'End':
				onSeek(duration);
				break;
			default:
				return;
		}
		event.preventDefault();
	};

	const cuepointMarkers = duration > 0 ? cuepoints || [] : [];

	return (
		<div className="c-flowplayer-progress">
			{showTimestamps && (
				<span
					className="c-flowplayer-progress__time c-flowplayer-progress__time--current"
					style={{ color: foregroundColor }}
				>
					{formatProgressTime(currentTime)}
				</span>
			)}
			<div
				ref={containerRef}
				className="c-flowplayer-progress__track"
				role="slider"
				tabIndex={0}
				aria-label={ariaLabel}
				aria-valuemin={0}
				aria-valuemax={duration}
				aria-valuenow={currentTime}
				aria-valuetext={formatProgressTime(currentTime)}
				onKeyDown={handleKeyDown}
				{...dragHandlers}
			>
				<div className="c-flowplayer-progress__buffered" style={{ width: `${bufferedPct}%` }} />
				<div
					className="c-flowplayer-progress__fill"
					style={{ width: `${playedPct}%`, backgroundColor: accentColor }}
				/>
				<div
					className="c-flowplayer-progress__handle"
					style={{ left: `${playedPct}%`, backgroundColor: accentColor }}
				/>
				{cuepointMarkers.map((cuepoint, index) => {
					if (cuepoint.startTime == null) {
						return null;
					}
					const start = cuepoint.startTime;
					const end = cuepoint.endTime ?? duration;
					return (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: cuepoints have no stable id
							key={index}
							className="c-flowplayer-progress__cuepoint"
							style={{
								left: `${(start / duration) * 100}%`,
								width: `${((end - start) / duration) * 100}%`,
							}}
						/>
					);
				})}
			</div>
			{showTimestamps && (
				<span
					className="c-flowplayer-progress__time c-flowplayer-progress__time--duration"
					style={{ color: foregroundColor }}
				>
					{formatProgressTime(duration)}
				</span>
			)}
		</div>
	);
};
