import type { KeyboardEvent } from 'react';
import { keysSpacebar } from '../../../utils/key-up';
import type { FlowplayerControlsActions } from './useFlowplayerState';

export interface UseKeyboardShortcutsOptions {
	actions: FlowplayerControlsActions;
}

/**
 * Space/F/M/arrow shortcuts while focus is anywhere inside the custom control bar.
 *
 * Volume is mute/unmute only (M) - no granular up/down, since there's no volume-level UI to
 * reflect it (see VolumeControl.tsx).
 *
 * Arrow-key seeking is a deliberate hybrid: Flowplayer's own global keyboard plugin already seeks
 * when the focused element has `aria-valuenow` (true for our progress bar), so we no-op there to
 * avoid double-firing. Everywhere else (play/pause, mute, fullscreen buttons) that plugin doesn't
 * recognize focus, so we call `enqueueSeek` ourselves (see useFlowplayerState.ts) to fill the gap.
 */
export function useKeyboardShortcuts({ actions }: UseKeyboardShortcutsOptions) {
	return (event: KeyboardEvent<HTMLElement>) => {
		if (event.defaultPrevented || event.altKey || event.shiftKey || event.metaKey || event.ctrlKey) {
			return;
		}

		const target = event.target as HTMLElement;

		// A focused <button> (play/pause, mute, fullscreen, ...) already activates on Space via
		// native browser behaviour - don't also run the global action, or the two fire together.
		const isButton = target.tagName === 'BUTTON';

		if (keysSpacebar.includes(event.key)) {
			if (isButton) {
				return;
			}
			actions.togglePlay();
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		switch (event.key) {
			case 'f':
			case 'F':
				actions.toggleFullscreen();
				break;
			case 'm':
			case 'M':
				actions.toggleMute();
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
