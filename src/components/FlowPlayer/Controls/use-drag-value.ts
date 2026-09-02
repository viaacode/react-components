import { type PointerEvent as ReactPointerEvent, useCallback, useRef } from 'react';

export interface UseDragValueOptions {
	orientation?: 'horizontal' | 'vertical';
	onChange: (percentage: number) => void; // 0-100
	onDragStart?: () => void;
	onDragEnd?: () => void;
}

/**
 * Shared pointer-drag logic for the progress bar and the volume bars: click or drag anywhere in
 * the container to set a 0-100 percentage. Pointer Events unify mouse/touch/pen in one code path.
 */
export function useDragValue({ orientation = 'horizontal', onChange, onDragStart, onDragEnd }: UseDragValueOptions) {
	const containerRef = useRef<HTMLDivElement>(null);

	const computeValue = useCallback(
		(clientX: number, clientY: number): number => {
			const el = containerRef.current;
			if (!el) {
				return 0;
			}
			const rect = el.getBoundingClientRect();
			const ratio =
				orientation === 'vertical'
					? (rect.bottom - clientY) / rect.height
					: (clientX - rect.left) / rect.width;
			return Math.max(0, Math.min(100, ratio * 100));
		},
		[orientation]
	);

	const handlePointerDown = useCallback(
		(event: ReactPointerEvent<HTMLDivElement>) => {
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
