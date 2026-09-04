import { renderHook } from '@testing-library/react';
import type { KeyboardEvent } from 'react';
import type { FlowplayerControlsActions } from './useFlowplayerState';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';

const buildActions = (): FlowplayerControlsActions => ({
	togglePlay: jest.fn(),
	seek: jest.fn(),
	enqueueSeek: jest.fn(),
	setSeeking: jest.fn(),
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
	it('does not act on ArrowUp/ArrowDown - volume is mute/unmute only, no granular control', () => {
		const actions = buildActions();
		const { result } = renderHook(() => useKeyboardShortcuts({ actions }));

		result.current(buildEvent('ArrowUp'));
		result.current(buildEvent('ArrowDown'));

		expect(actions.toggleMute).not.toHaveBeenCalled();
		expect(actions.enqueueSeek).not.toHaveBeenCalled();
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

	it('toggles play on Space unless focus is on a button', () => {
		const actions = buildActions();
		const { result } = renderHook(() => useKeyboardShortcuts({ actions }));

		result.current(buildEvent(' '));
		expect(actions.togglePlay).toHaveBeenCalledTimes(1);

		result.current(buildEvent(' ', { tagName: 'BUTTON' }));
		expect(actions.togglePlay).toHaveBeenCalledTimes(1);
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
