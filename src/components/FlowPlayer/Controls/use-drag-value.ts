import { type PointerEvent as ReactPointerEvent, useCallback, useRef } from 'react';
import { clamp } from '../../../utils/clamp';

export interface UseDragValueOptions {
	orientation?: 'horizontal' | 'vertical';
	onChange: (percentage: number) => void; // 0-100
	onDragStart?: () => void;
	onDragEnd?: () => void;
}

/** Shared pointer-drag logic for the progress bar and volume bars: click/drag to set a 0-100 value. */
export function useDragValue({ orientation = 'horizontal', onChange, onDragStart, onDragEnd }: UseDragValueOptions) {
	const containerRef = useRef<HTMLDivElement>(null);
	// Cached on pointerdown, reused for the rest of the drag - avoids re-measuring on every pointermove.
	const rectRef = useRef<DOMRect | null>(null);

	const computeValue = useCallback(
		(clientX: number, clientY: number): number => {
			const rect = rectRef.current;
			if (!rect) {
				return 0;
			}
			const ratio =
				orientation === 'vertical'
					? (rect.bottom - clientY) / rect.height
					: (clientX - rect.left) / rect.width;
			return clamp(ratio * 100, 0, 100);
		},
		[orientation]
	);

	const handlePointerDown = useCallback(
		(event: ReactPointerEvent<HTMLDivElement>) => {
			rectRef.current = event.currentTarget.getBoundingClientRect();
			event.currentTarget.setPointerCapture(event.pointerId);
			onDragStart?.();
			onChange(computeValue(event.clientX, event.clientY));
		},
		[computeValue, onChange, onDragStart]
	);

	const handlePointerMove = useCallback(
		(event: ReactPointerEvent<HTMLDivElement>) => {
			if (event.buttons !== 1) {
				return;
			}
			onChange(computeValue(event.clientX, event.clientY));
		},
		[computeValue, onChange]
	);

	const handlePointerUp = useCallback(
		(event: ReactPointerEvent<HTMLDivElement>) => {
			if (event.currentTarget.hasPointerCapture(event.pointerId)) {
				event.currentTarget.releasePointerCapture(event.pointerId);
			}
			onDragEnd?.();
		},
		[onDragEnd]
	);

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
