import type { KeyboardEvent } from 'react';
import type { FlowplayerControlsActions, FlowplayerControlsState } from './useFlowplayerState';

export interface UseKeyboardShortcutsOptions {
	state: FlowplayerControlsState;
	actions: FlowplayerControlsActions;
	volumeStepPercent: number;
}

/**
 * Space/F/M/volume/arrow shortcuts while focus is anywhere inside the custom control bar.
 *
 * Arrow-key seeking is a deliberate hybrid, not a full delegation to Flowplayer's own global
 * `keyboard` plugin (bound to `document`, always active, can't be disabled per-instance). That
 * plugin resolves "the active player" from `document.activeElement` in two ways: either the
 * focused element has an `aria-valuenow` attribute (a slider - our progress bar qualifies, via
 * `role="slider"`), or nothing in our UI has focus at all (`activeElement === document.body`,
 * relying on a prior mousedown). Confirmed live: with focus on our progress bar, arrow keys work
 * with zero code of ours - native's own overlay, debounce, everything. But with focus on any of
 * our *other* controls (play/pause, mute, fullscreen - real, individually-focusable `<button>`s,
 * deliberately not native's non-interactive custom elements), that resolution fails and native's
 * listener silently does nothing - not an edge case, but the single most common state right after
 * clicking play. So: when focus is already on our own slider, do nothing here and let native's
 * listener handle it alone (calling it too would double-fire - confirmed live). Everywhere else,
 * call the player's own `enqueueSeek` ourselves (see useFlowplayerState.ts) to fill that gap while
 * still getting native's overlay/debounce for free.
 */
export function useKeyboardShortcuts({
	state,
	actions,
	volumeStepPercent,
}: UseKeyboardShortcutsOptions) {
	return (event: KeyboardEvent<HTMLElement>) => {
		if (event.defaultPrevented || event.altKey || event.shiftKey || event.metaKey || event.ctrlKey) {
			return;
		}

		const target = event.target as HTMLElement;

		// A focused <button> (play/pause, mute, fullscreen, ...) already activates on Space via
		// native browser behaviour - don't also run the global action, or the two fire together.
		const isButton = target.tagName === 'BUTTON';

		switch (event.key) {
			case ' ':
			case 'Spacebar':
				if (isButton) {
					return;
				}
				actions.togglePlay();
				break;
			case 'f':
			case 'F':
				actions.toggleFullscreen();
				break;
			case 'm':
			case 'M':
				actions.toggleMute();
				break;
			case 'ArrowUp':
				actions.setVolume(state.volume + volumeStepPercent);
				break;
			case 'ArrowDown':
				actions.setVolume(state.volume - volumeStepPercent);
				break;
			case 'ArrowRight':
				if (target.hasAttribute('aria-valuenow')) {
					return;
				}
				actions.enqueueSeek(1);
				break;
			case 'ArrowLeft':
				if (target.hasAttribute('aria-valuenow')) {
					return;
				}
				actions.enqueueSeek(-1);
				break;
			default:
				return;
		}

		event.preventDefault();
		event.stopPropagation();
	};
}
