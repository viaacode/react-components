import type { KeyboardEvent } from 'react';
import { keysSpacebar } from '../../../utils/key-up';
import { NATIVE_VOLUME_KEY_STEP } from './Controls.consts';
import type { FlowplayerControlsActions } from './useFlowplayerState';

export interface UseKeyboardShortcutsOptions {
	actions: FlowplayerControlsActions;
	/** Any flyout open. Arrow keys then belong to the flyout, not to the player behind it. */
	isFlyoutOpen?: boolean;
}

/**
 * Space/F/M/arrow shortcuts while focus is anywhere inside the custom control bar.
 *
 * Both arrow axes are handled here rather than left to Flowplayer's global keyboard plugin, which
 * gets them wrong for us in two ways: its volume nudge never releases the `muted` latch it walks
 * into at volume 0, and its seek fires even while one of our flyouts is open. Anything we handle is
 * stopped from propagating so the plugin can't also act on it.
 *
 * VolumeBars stops its own arrows before they reach us, so it keeps owning both axes while
 * focused; the progress bar handles neither, hence the `aria-valuenow` passthrough below.
 */
export function useKeyboardShortcuts({ actions, isFlyoutOpen }: UseKeyboardShortcutsOptions) {
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
			case 'ArrowUp':
			case 'ArrowDown':
				actions.adjustVolume(
					event.key === 'ArrowUp' ? NATIVE_VOLUME_KEY_STEP : -NATIVE_VOLUME_KEY_STEP
				);
				break;
			case 'ArrowRight':
			case 'ArrowLeft':
				// Our progress bar has no `.fp-timeline` class, so the plugin's focused-slider branch
				// doesn't claim it and its global seek is what actually moves the playhead.
				if (target.hasAttribute('aria-valuenow')) {
					return;
				}
				// Seeking the video out from under an open flyout isn't what pressing an arrow inside
				// a popover should do. Swallowed below either way, so the plugin can't seek either.
				if (!isFlyoutOpen) {
					actions.enqueueSeek(event.key === 'ArrowRight' ? 1 : -1);
				}
				break;
			default:
				return;
		}

		event.preventDefault();
		event.stopPropagation();
	};
}
