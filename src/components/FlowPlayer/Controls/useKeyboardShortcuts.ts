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
 * Arrow-key seeking is a deliberate hybrid: Flowplayer's own global keyboard plugin already seeks
 * when the focused element has `aria-valuenow` (true for our progress bar), so we no-op there to
 * avoid double-firing. Everywhere else (play/pause, mute, fullscreen buttons) that plugin doesn't
 * recognize focus, so we call `enqueueSeek` ourselves (see useFlowplayerState.ts) to fill the gap.
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
				if (target.hasAttribute('aria-valuenow')) {
					return;
				}
				actions.setVolume(state.volume + volumeStepPercent);
				break;
			case 'ArrowDown':
				if (target.hasAttribute('aria-valuenow')) {
					return;
				}
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
