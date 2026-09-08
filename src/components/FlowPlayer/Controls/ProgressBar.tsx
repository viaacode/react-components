import {
	type FC,
	type FocusEvent,
	type KeyboardEvent,
	useCallback,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react';
import { clamp } from '../../../utils/clamp';
import { formatDuration } from '../../../utils/formatters/duration';
import type { ProgressBarProps } from './ProgressBar.types';
import { useDragValue } from './use-drag-value';

// Adaptive, unpadded (e.g. "3:45", "1:03:45") - fixed-width "00:03:45" reads oddly for a live readout.
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
	cuepointColor,
	ariaLabel,
	cuepointLabel,
}) => {
	const isSeekable = duration > 0;
	const playedPct = isSeekable ? clamp((currentTime / duration) * 100, 0, 100) : 0;
	const bufferedPct = isSeekable ? clamp((bufferedEnd / duration) * 100, 0, 100) : 0;

	// The value announced to assistive tech: kept in sync with `currentTime` while unfocused, but
	// frozen while focused so a screen reader doesn't re-announce it on every playback tick - only
	// resynced on blur or on a seek this component itself triggered (Home/End, drag).
	const [announcedTime, setAnnouncedTime] = useState(currentTime);
	const isFocusedRef = useRef(false);

	useEffect(() => {
		if (!isFocusedRef.current) {
			setAnnouncedTime(currentTime);
		}
	}, [currentTime]);

	const handleFocus = () => {
		isFocusedRef.current = true;
	};

	// Also covers an ArrowLeft/ArrowRight seek from Flowplayer's global keyboard plugin (see below) -
	// it can't call setAnnouncedTime directly, but its seek still ends in a blur or another
	// interaction that resyncs this.
	const handleBlur = (_event: FocusEvent<HTMLDivElement>) => {
		isFocusedRef.current = false;
		setAnnouncedTime(currentTime);
	};

	const handleDragChange = useCallback(
		(percentage: number) => {
			if (duration > 0) {
				const time = (percentage / 100) * duration;
				onSeek(time);
				setAnnouncedTime(time);
			}
		},
		[duration, onSeek]
	);

	const { containerRef, dragHandlers } = useDragValue({
		onDragStart: onSeekStart,
		onDragEnd: onSeekEnd,
		onChange: handleDragChange,
	});

	// ArrowLeft/ArrowRight aren't handled here - Flowplayer's own global keyboard plugin already
	// seeks on arrow keys when this track (role="slider") has focus; handling it too would
	// double-fire. Home/End have no native equivalent, so those still jump directly.
	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (duration <= 0) {
			return;
		}
		switch (event.key) {
			case 'Home':
				onSeek(0);
				setAnnouncedTime(0);
				break;
			case 'End':
				onSeek(duration);
				setAnnouncedTime(duration);
				break;
			default:
				return;
		}
		event.preventDefault();
	};

	const cuepointRanges = (isSeekable ? cuepoints || [] : []).flatMap((cuepoint) =>
		cuepoint.startTime == null
			? []
			: [{ start: cuepoint.startTime, end: cuepoint.endTime ?? duration }]
	);

	// Cuepoints mark a highlighted segment (playback starts/stops at its bounds) - a purely visual
	// affordance for sighted users otherwise, so announce it via aria-describedby.
	const cuepointDescriptionId = useId();
	const cuepointDescription =
		cuepointRanges.length > 0
			? cuepointRanges
					.map(
						({ start, end }) =>
							`${cuepointLabel}: ${formatProgressTime(start)}–${formatProgressTime(end)}`
					)
					.join(', ')
			: null;

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
				// Fills the full height of the control bar's pill, not just the thin visual track below -
				// a much easier target to click/drag than the 4px line alone (same width, so the
				// drag-to-percentage math in use-drag-value.ts is unaffected either way).
				className="c-flowplayer-progress__hit-area"
				role="slider"
				tabIndex={isSeekable ? 0 : -1}
				aria-disabled={!isSeekable}
				aria-label={ariaLabel}
				aria-describedby={cuepointDescription ? cuepointDescriptionId : undefined}
				aria-valuemin={0}
				aria-valuemax={duration}
				aria-valuenow={announcedTime}
				aria-valuetext={formatProgressTime(announcedTime)}
				onKeyDown={handleKeyDown}
				onFocus={handleFocus}
				onBlur={handleBlur}
				{...dragHandlers}
			>
				<div className="c-flowplayer-progress__track">
					<div className="c-flowplayer-progress__buffered" style={{ width: `${bufferedPct}%` }} />
					{cuepointRanges.map(({ start, end }, index) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: cuepoints have no stable id
							key={index}
							className="c-flowplayer-progress__cuepoint"
							style={{
								left: `${(start / duration) * 100}%`,
								width: `${((end - start) / duration) * 100}%`,
								backgroundColor: `color-mix(in srgb, ${cuepointColor} 60%, transparent)`,
							}}
						/>
					))}
					{/* Drawn after the cuepoint markers (later in source order = higher paint order in
					this shared stacking context) so playback progress stays visible over any cuepoint
					it has already passed, instead of the marker painting over it. */}
					<div
						className="c-flowplayer-progress__fill"
						style={{ width: `${playedPct}%`, backgroundColor: accentColor }}
					/>
					<div
						className="c-flowplayer-progress__handle"
						style={{ left: `${playedPct}%`, backgroundColor: accentColor }}
					/>
				</div>
			</div>
			{cuepointDescription && (
				<span id={cuepointDescriptionId} className="c-flowplayer-progress__sr-only">
					{cuepointDescription}
				</span>
			)}
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
