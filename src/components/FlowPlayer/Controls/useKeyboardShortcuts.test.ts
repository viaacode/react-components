import { renderHook } from '@testing-library/react';
import type { KeyboardEvent } from 'react';
import type { FlowplayerControlsActions, FlowplayerControlsState } from './useFlowplayerState';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';

const buildState = (overrides: Partial<FlowplayerControlsState> = {}): FlowplayerControlsState => ({
	paused: true,
	currentTime: 0,
	duration: 100,
	bufferedEnd: 0,
	volume: 50,
	muted: false,
	isFullscreen: false,
	playbackRate: 1,
	...overrides,
});

const buildActions = (): FlowplayerControlsActions => ({
	togglePlay: jest.fn(),
	seek: jest.fn(),
	enqueueSeek: jest.fn(),
	setSeeking: jest.fn(),
	setVolume: jest.fn(),
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
	it('changes volume on ArrowUp/ArrowDown when focus is not on a slider', () => {
		const state = buildState({ volume: 50 });
		const actions = buildActions();
		const { result } = renderHook(() =>
			useKeyboardShortcuts({ state, actions, volumeStepPercent: 10 })
		);

		result.current(buildEvent('ArrowUp'));
		expect(actions.setVolume).toHaveBeenCalledWith(60);

		result.current(buildEvent('ArrowDown'));
		expect(actions.setVolume).toHaveBeenCalledWith(40);
	});

	it('does not hijack volume on ArrowUp/ArrowDown when focus is on a slider (e.g. the progress bar)', () => {
		// Regression: unlike ArrowLeft/ArrowRight, ArrowUp/ArrowDown used to change volume even
		// while a `role="slider"` element (identified via `aria-valuenow`) had focus - surprising a
		// keyboard user seeking with the progress bar by changing their volume instead.
		const state = buildState({ volume: 50 });
		const actions = buildActions();
		const { result } = renderHook(() =>
			useKeyboardShortcuts({ state, actions, volumeStepPercent: 10 })
		);

		result.current(buildEvent('ArrowUp', { isSlider: true }));
		result.current(buildEvent('ArrowDown', { isSlider: true }));

		expect(actions.setVolume).not.toHaveBeenCalled();
	});

	it('does not seek on ArrowLeft/ArrowRight when focus is on a slider', () => {
		const state = buildState();
		const actions = buildActions();
		const { result } = renderHook(() =>
			useKeyboardShortcuts({ state, actions, volumeStepPercent: 10 })
		);

		result.current(buildEvent('ArrowRight', { isSlider: true }));
		result.current(buildEvent('ArrowLeft', { isSlider: true }));

		expect(actions.enqueueSeek).not.toHaveBeenCalled();
	});

	it('seeks on ArrowLeft/ArrowRight when focus is elsewhere', () => {
		const state = buildState();
		const actions = buildActions();
		const { result } = renderHook(() =>
			useKeyboardShortcuts({ state, actions, volumeStepPercent: 10 })
		);

		result.current(buildEvent('ArrowRight'));
		expect(actions.enqueueSeek).toHaveBeenCalledWith(1);

		result.current(buildEvent('ArrowLeft'));
		expect(actions.enqueueSeek).toHaveBeenCalledWith(-1);
	});

	it('toggles play on Space unless focus is on a button', () => {
		const state = buildState();
		const actions = buildActions();
		const { result } = renderHook(() =>
			useKeyboardShortcuts({ state, actions, volumeStepPercent: 10 })
		);

		result.current(buildEvent(' '));
		expect(actions.togglePlay).toHaveBeenCalledTimes(1);

		result.current(buildEvent(' ', { tagName: 'BUTTON' }));
		expect(actions.togglePlay).toHaveBeenCalledTimes(1);
	});

	it('toggles fullscreen on F and mute on M', () => {
		const state = buildState();
		const actions = buildActions();
		const { result } = renderHook(() =>
			useKeyboardShortcuts({ state, actions, volumeStepPercent: 10 })
		);

		result.current(buildEvent('f'));
		expect(actions.toggleFullscreen).toHaveBeenCalledTimes(1);

		result.current(buildEvent('m'));
		expect(actions.toggleMute).toHaveBeenCalledTimes(1);
	});

	it('ignores keys with modifiers held', () => {
		const state = buildState();
		const actions = buildActions();
		const { result } = renderHook(() =>
			useKeyboardShortcuts({ state, actions, volumeStepPercent: 10 })
		);

		const event = buildEvent('f');
		(event as any).ctrlKey = true;
		result.current(event);

		expect(actions.toggleFullscreen).not.toHaveBeenCalled();
	});
});
