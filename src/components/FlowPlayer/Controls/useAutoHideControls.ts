import { type RefObject, useEffect, useRef, useState } from 'react';

export interface UseAutoHideControlsOptions {
	containerRef: RefObject<HTMLElement | null>;
	delayMs: number; // 0 disables auto-hide
	isPlaying: boolean;
	/** Suppress hiding while e.g. a volume/speed flyout is open. */
	suppress: boolean;
}

/**
 * While playing, hides after `delayMs` of inactivity or immediately on pointer-leave. Always
 * visible while paused or `suppress` is true. Handles `touchstart` itself since native's own
 * tap-to-reveal lives in the UI bundle we're hiding.
 */
export function useAutoHideControls({ containerRef, delayMs, isPlaying, suppress }: UseAutoHideControlsOptions) {
	const [isVisible, setIsVisible] = useState(true);
	const timeoutRef = useRef<number | null>(null);

	useEffect(() => {
		const clearPendingHide = () => {
			if (timeoutRef.current !== null) {
				window.clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};

		if (delayMs <= 0 || !isPlaying || suppress) {
			setIsVisible(true);
			clearPendingHide();
			return;
		}

		const el = containerRef.current;
		if (!el) {
			return;
		}

		const resetTimer = () => {
			setIsVisible(true);
			clearPendingHide();
			timeoutRef.current = window.setTimeout(() => setIsVisible(false), delayMs);
		};

		resetTimer();

		const hideNow = () => {
			clearPendingHide();
			setIsVisible(false);
		};

		const events: (keyof HTMLElementEventMap)[] = ['mousemove', 'touchstart', 'keydown', 'click'];
		for (const eventName of events) {
			el.addEventListener(eventName, resetTimer);
		}
		el.addEventListener('mouseleave', hideNow);

		return () => {
			for (const eventName of events) {
				el.removeEventListener(eventName, resetTimer);
			}
			el.removeEventListener('mouseleave', hideNow);
			clearPendingHide();
		};
	}, [containerRef, delayMs, isPlaying, suppress]);

	return isVisible;
}
