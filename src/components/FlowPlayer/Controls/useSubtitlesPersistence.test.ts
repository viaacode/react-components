import { renderHook } from '@testing-library/react';
import { useSubtitlesPersistence } from './useSubtitlesPersistence';

const KEY_PREFIX = 'test-flowplayer';
const STORAGE_KEY = `${KEY_PREFIX}:subtitles-track`;

describe('useSubtitlesPersistence', () => {
	beforeEach(() => {
		window.localStorage.clear();
	});

	it('does not restore before the player is ready', () => {
		window.localStorage.setItem(STORAGE_KEY, 'nl');
		const onRestore = jest.fn();

		renderHook(() =>
			useSubtitlesPersistence({
				enabled: true,
				keyPrefix: KEY_PREFIX,
				isPlayerReady: false,
				onRestore,
			})
		);

		expect(onRestore).not.toHaveBeenCalled();
	});

	it('restores the stored track once the player becomes ready', () => {
		// Regression: the restore effect used to run (and flip its one-shot guard) before the
		// player existed, and was never retried once it became ready - so this restore was
		// silently dropped every time.
		window.localStorage.setItem(STORAGE_KEY, 'nl');
		const onRestore = jest.fn();

		const { rerender } = renderHook(
			({ isPlayerReady }) =>
				useSubtitlesPersistence({
					enabled: true,
					keyPrefix: KEY_PREFIX,
					isPlayerReady,
					onRestore,
				}),
			{ initialProps: { isPlayerReady: false } }
		);

		expect(onRestore).not.toHaveBeenCalled();

		rerender({ isPlayerReady: true });

		expect(onRestore).toHaveBeenCalledTimes(1);
		expect(onRestore).toHaveBeenCalledWith('nl');
	});

	it('restores `null` when subtitles were explicitly turned off', () => {
		window.localStorage.setItem(STORAGE_KEY, '__off__');
		const onRestore = jest.fn();

		renderHook(() =>
			useSubtitlesPersistence({
				enabled: true,
				keyPrefix: KEY_PREFIX,
				isPlayerReady: true,
				onRestore,
			})
		);

		expect(onRestore).toHaveBeenCalledWith(null);
	});

	it('does not call onRestore when nothing is stored', () => {
		const onRestore = jest.fn();

		renderHook(() =>
			useSubtitlesPersistence({
				enabled: true,
				keyPrefix: KEY_PREFIX,
				isPlayerReady: true,
				onRestore,
			})
		);

		expect(onRestore).not.toHaveBeenCalled();
	});

	it('only restores once, even if the player becomes ready again', () => {
		window.localStorage.setItem(STORAGE_KEY, 'nl');
		const onRestore = jest.fn();

		const { rerender } = renderHook(
			({ isPlayerReady }) =>
				useSubtitlesPersistence({
					enabled: true,
					keyPrefix: KEY_PREFIX,
					isPlayerReady,
					onRestore,
				}),
			{ initialProps: { isPlayerReady: true } }
		);
		rerender({ isPlayerReady: false });
		rerender({ isPlayerReady: true });

		expect(onRestore).toHaveBeenCalledTimes(1);
	});

	it('does not restore when persistence is disabled', () => {
		window.localStorage.setItem(STORAGE_KEY, 'nl');
		const onRestore = jest.fn();

		renderHook(() =>
			useSubtitlesPersistence({
				enabled: false,
				keyPrefix: KEY_PREFIX,
				isPlayerReady: true,
				onRestore,
			})
		);

		expect(onRestore).not.toHaveBeenCalled();
	});

	it('persist() writes the track key, and null as the off-sentinel', () => {
		const { result } = renderHook(() =>
			useSubtitlesPersistence({
				enabled: true,
				keyPrefix: KEY_PREFIX,
				isPlayerReady: true,
				onRestore: jest.fn(),
			})
		);

		result.current.persist('en');
		expect(window.localStorage.getItem(STORAGE_KEY)).toEqual('en');

		result.current.persist(null);
		expect(window.localStorage.getItem(STORAGE_KEY)).toEqual('__off__');
	});

	it('persist() does nothing when disabled', () => {
		const { result } = renderHook(() =>
			useSubtitlesPersistence({
				enabled: false,
				keyPrefix: KEY_PREFIX,
				isPlayerReady: true,
				onRestore: jest.fn(),
			})
		);

		result.current.persist('en');
		expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
	});
});
