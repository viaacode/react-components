import { renderHook } from '@testing-library/react';
import type { KeyboardEvent } from 'react';
import type { FlowplayerControlsActions } from './useFlowplayerState';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';

const buildActions = (): FlowplayerControlsActions => ({
	togglePlay: jest.fn(),
	seek: jest.fn(),
	enqueueSeek: jest.fn(),
	setSeeking: jest.fn(),
	setVolume: jest.fn(),
	adjustVolume: jest.fn(),
	toggleMute: jest.fn(),
	toggleFullscreen: jest.fn(),
	setPlaybackRate: jest.fn(),
});

function buildEvent(
	key: string,
	{ isSlider = false, tagName = 'DIV' }: { isSlider?: boolean; tagName?: string } = {}
): KeyboardEvent<HTMLElement> {
	const target = document.createElement(tagName);
	if (isSlider) {
		target.setAttribute('aria-valuenow', '10');
	}
	return {
		key,
		target,
		defaultPrevented: false,
		altKey: false,
		shiftKey: false,
		metaKey: false,
		ctrlKey: false,
		preventDefault: jest.fn(),
		stopPropagation: jest.fn(),
	} as unknown as KeyboardEvent<HTMLElement>;
}

describe('useKeyboardShortcuts', () => {
	// Regression: these used to fall through to Flowplayer's global plugin, whose bare
	// `player.volume + delta` walks down to 0 - latching `muted` on - and never unmutes on the way
	// back up, leaving the arrows able to silence the player but not to restore it.
	it('adjusts volume on ArrowUp/ArrowDown instead of leaving it to the native plugin', () => {
		const actions = buildActions();
		const { result } = renderHook(() => useKeyboardShortcuts({ actions }));

		const up = buildEvent('ArrowUp');
		result.current(up);
		expect(actions.adjustVolume).toHaveBeenCalledWith(15);

		result.current(buildEvent('ArrowDown'));
		expect(actions.adjustVolume).toHaveBeenCalledWith(-15);

		expect(actions.enqueueSeek).not.toHaveBeenCalled();
		// Without this the plugin applies its own nudge on top of ours.
		expect(up.stopPropagation).toHaveBeenCalled();
	});

	// Volume stays a player-wide key, as it is natively - only the seek below is withheld while a
	// flyout is open.
	it('keeps adjusting volume on ArrowUp/ArrowDown while a flyout is open', () => {
		const actions = buildActions();
		const { result } = renderHook(() => useKeyboardShortcuts({ actions, isFlyoutOpen: true }));

		result.current(buildEvent('ArrowUp'));

		expect(actions.adjustVolume).toHaveBeenCalledWith(15);
	});

	it('does not seek on ArrowLeft/ArrowRight when focus is on a slider', () => {
		const actions = buildActions();
		const { result } = renderHook(() => useKeyboardShortcuts({ actions }));

		result.current(buildEvent('ArrowRight', { isSlider: true }));
		result.current(buildEvent('ArrowLeft', { isSlider: true }));

		expect(actions.enqueueSeek).not.toHaveBeenCalled();
	});

	it('seeks on ArrowLeft/ArrowRight when focus is elsewhere', () => {
		const actions = buildActions();
		const { result } = renderHook(() => useKeyboardShortcuts({ actions }));

		result.current(buildEvent('ArrowRight'));
		expect(actions.enqueueSeek).toHaveBeenCalledWith(1);

		result.current(buildEvent('ArrowLeft'));
		expect(actions.enqueueSeek).toHaveBeenCalledWith(-1);
	});

	// Regression: an open flyout used to let ArrowLeft/ArrowRight rewind and fast-forward the video
	// behind it, so navigating a popover moved the playhead.
	it('does not seek on ArrowLeft/ArrowRight while a flyout is open', () => {
		const actions = buildActions();
		const { result } = renderHook(() => useKeyboardShortcuts({ actions, isFlyoutOpen: true }));

		const event = buildEvent('ArrowRight');
		result.current(event);
		result.current(buildEvent('ArrowLeft'));

		expect(actions.enqueueSeek).not.toHaveBeenCalled();
		// Swallowed rather than ignored - otherwise Flowplayer's global plugin seeks instead.
		expect(event.preventDefault).toHaveBeenCalled();
		expect(event.stopPropagation).toHaveBeenCalled();
	});

	it('toggles play on Space, but clicks the target directly when it is a button', () => {
		const actions = buildActions();
		const { result } = renderHook(() => useKeyboardShortcuts({ actions }));

		result.current(buildEvent(' '));
		expect(actions.togglePlay).toHaveBeenCalledTimes(1);

		const buttonEvent = buildEvent(' ', { tagName: 'BUTTON' });
		const clickSpy = jest.spyOn(buttonEvent.target as HTMLElement, 'click');
		result.current(buttonEvent);
		expect(actions.togglePlay).toHaveBeenCalledTimes(1);
		expect(clickSpy).toHaveBeenCalledTimes(1);
		expect(buttonEvent.preventDefault).toHaveBeenCalled();
		expect(buttonEvent.stopPropagation).toHaveBeenCalled();
	});

	it('toggles fullscreen on F and mute on M', () => {
		const actions = buildActions();
		const { result } = renderHook(() => useKeyboardShortcuts({ actions }));

		result.current(buildEvent('f'));
		expect(actions.toggleFullscreen).toHaveBeenCalledTimes(1);

		result.current(buildEvent('m'));
		expect(actions.toggleMute).toHaveBeenCalledTimes(1);
	});

	it('ignores keys with modifiers held', () => {
		const actions = buildActions();
		const { result } = renderHook(() => useKeyboardShortcuts({ actions }));

		const event = buildEvent('f');
		(event as any).ctrlKey = true;
		result.current(event);

		expect(actions.toggleFullscreen).not.toHaveBeenCalled();
	});
});
