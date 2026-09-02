import { type RefObject, useEffect, useRef, useState } from 'react';

export interface UseAutoHideControlsOptions {
	containerRef: RefObject<HTMLElement | null>;
	delayMs: number; // 0 disables auto-hide
	isPlaying: boolean;
	/** Suppress hiding while e.g. a volume/speed flyout is open. */
	suppress: boolean;
}

/**
 * Visible by default; while playing, hides after `delayMs` of no pointer/keyboard activity, or
 * immediately once the pointer leaves the player entirely (matching native mode's hover-driven
 * behaviour, rather than only ever timing out). Always visible while paused, or while `suppress`
 * is true. Touch is handled via `touchstart` since flowplayer's own tap-to-reveal machinery lives
 * in the native UI bundle we're hiding and does nothing for a hidden native bar.
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
