import { type PointerEvent as ReactPointerEvent, useCallback, useEffect, useRef } from 'react';
import { clamp } from '../../../utils/clamp';

export interface UseDragValueOptions {
	onChange: (percentage: number) => void; // 0-100
	onDragStart?: () => void;
	onDragEnd?: () => void;
}

/** Pointer-drag logic for the progress bar: click/drag along a horizontal track to set a 0-100 value. */
export function useDragValue({ onChange, onDragStart, onDragEnd }: UseDragValueOptions) {
	const containerRef = useRef<HTMLDivElement>(null);
	// Cached on pointerdown, reused for the rest of the drag - avoids re-measuring on every pointermove.
	const rectRef = useRef<DOMRect | null>(null);
	const rafRef = useRef<number | null>(null);

	const computeValue = useCallback((clientX: number): number => {
		const rect = rectRef.current;
		if (!rect) {
			return 0;
		}
		return clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
	}, []);

	const cancelPendingFrame = useCallback(() => {
		if (rafRef.current !== null) {
			cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
		}
	}, []);

	const handlePointerDown = useCallback(
		(event: ReactPointerEvent<HTMLDivElement>) => {
			rectRef.current = event.currentTarget.getBoundingClientRect();
			event.currentTarget.setPointerCapture(event.pointerId);
			onDragStart?.();
			onChange(computeValue(event.clientX));
		},
		[computeValue, onChange, onDragStart]
	);

	const handlePointerMove = useCallback(
		(event: ReactPointerEvent<HTMLDivElement>) => {
			if (event.buttons !== 1) {
				return;
			}
			// A drag fires many raw pointermove events between frames - collapse them to at most one
			// onChange (and the seek + re-render it triggers) per animation frame, using whichever
			// position was most recent when the frame runs.
			const { clientX } = event;
			cancelPendingFrame();
			rafRef.current = requestAnimationFrame(() => {
				rafRef.current = null;
				onChange(computeValue(clientX));
			});
		},
		[cancelPendingFrame, computeValue, onChange]
	);

	const handlePointerUp = useCallback(
		(event: ReactPointerEvent<HTMLDivElement>) => {
			cancelPendingFrame();
			if (event.currentTarget.hasPointerCapture(event.pointerId)) {
				event.currentTarget.releasePointerCapture(event.pointerId);
			}
			onDragEnd?.();
		},
		[cancelPendingFrame, onDragEnd]
	);

	useEffect(() => cancelPendingFrame, [cancelPendingFrame]);

	return {
		containerRef,
		dragHandlers: {
			onPointerDown: handlePointerDown,
			onPointerMove: handlePointerMove,
			onPointerUp: handlePointerUp,
			onPointerCancel: handlePointerUp,
		},
	};
}
