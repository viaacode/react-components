import type { KeyboardEvent } from 'react';
import { keysSpacebar } from '../../../utils/key-up';
import type { FlowplayerControlsActions } from './useFlowplayerState';

export interface UseKeyboardShortcutsOptions {
	actions: FlowplayerControlsActions;
}

/**
 * Space/F/M/arrow shortcuts while focus is anywhere inside the custom control bar.
 *
 * Volume is mute/unmute only (M) - there's no volume-level UI to reflect finer control.
 *
 * Arrow-key seeking is a deliberate hybrid: Flowplayer's global keyboard plugin already seeks when
 * the focused element has `aria-valuenow` (our progress bar), so we no-op there to avoid double-
 * firing, and call `enqueueSeek` ourselves everywhere else.
 */
export function useKeyboardShortcuts({ actions }: UseKeyboardShortcutsOptions) {
	return (event: KeyboardEvent<HTMLElement>) => {
		if (
			event.defaultPrevented ||
			event.altKey ||
			event.shiftKey ||
			event.metaKey ||
			event.ctrlKey
		) {
			return;
		}

		const target = event.target as HTMLElement;
		const isButton = target.tagName === 'BUTTON';

		// A focused button is clicked directly rather than left to native Space activation:
		// Flowplayer's global keyboard plugin preventDefaults Space wherever focus is in the player,
		// which swallows the native click on any button but play/pause (e.g. Space on Mute would
		// just toggle playback instead of muting).
		if (keysSpacebar.includes(event.key)) {
			if (isButton) {
				target.click();
			} else {
				actions.togglePlay();
			}
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
