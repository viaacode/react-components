import type { Player } from '@flowplayer/player';
import { type MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

// `transitionState` is Flowplayer's own internal state-transition helper - not part of the
// public API/types. It's what native UI's own click handling calls to produce the "is-toggling"
// flash (a brief class that reveals `.fp-play`/`.fp-pause` for ~300ms via flowplayer.css) whenever
// play/pause is triggered through its own DOM elements (confirmed live: clicking the native
// `.fp-middle` passthrough fires it, calling `player.togglePlay()` directly - as our own button
// does - does not). Calling it ourselves right after toggling reproduces that same native flash
// for our custom button instead of leaving it silently missing. Version-pinned (`3.32.1`,
// package.json) since this isn't a documented method and could change on a flowplayer upgrade.
interface PlayerWithTransitionState extends Player {
	transitionState: (nextState: string, previousState: string, durationMs: number) => void;
}

const NATIVE_TOGGLE_FLASH_DURATION_MS = 300;

// `enqueueSeek` is Flowplayer's own internal step-seek helper - also excluded from the public
// types (`/* Excluded from this release type: enqueueSeek */` in @flowplayer/player's .d.ts), same
// undocumented-but-real category as `transitionState` above. Its own global `keyboard` plugin
// already calls this on arrow keys, but ONLY resolves "the active player" when
// `document.activeElement` itself has an `aria-valuenow` attribute (confirmed live: focus our own
// progress bar - has `aria-valuenow` via `role="slider"` - and arrow keys work with zero code of
// ours; focus any of our plain buttons - play/pause, mute, fullscreen, none of which are sliders -
// and Flowplayer's own listener silently no-ops). That's a real gap in native's own model, not
// something we introduced: its own non-slider controls are custom elements that were never real
// Tab stops to begin with, so it never needed to handle this case. Our controls deliberately ARE
// real, individually-focusable `<button>`s (see FlowPlayer's own accessibility notes), so this gap
// is reachable in practice. `useKeyboardShortcuts.ts` calls this itself, but only when focus is on
// something other than our own slider, to fill exactly that gap without double-handling the case
// Flowplayer's own listener already covers.
interface PlayerWithEnqueueSeek extends Player {
	enqueueSeek: (offsetSeconds: number) => void;
}

const DEFAULT_NATIVE_SEEK_STEP_SECONDS = 5;

export interface FlowplayerControlsState {
	paused: boolean;
	currentTime: number;
	duration: number;
	bufferedEnd: number;
	volume: number; // 0-100
	muted: boolean;
	isFullscreen: boolean;
	playbackRate: number;
}

export interface FlowplayerControlsActions {
	togglePlay: () => void;
	seek: (time: number) => void;
	/** `direction`: 1 to seek forward, -1 to seek backward, by Flowplayer's own configured step. */
	enqueueSeek: (direction: 1 | -1) => void;
	setSeeking: (seeking: boolean) => void;
	setVolume: (volume: number) => void; // 0-100
	toggleMute: () => void;
	toggleFullscreen: () => void;
	setPlaybackRate: (rate: number) => void;
}

const INITIAL_STATE: FlowplayerControlsState = {
	paused: true,
	currentTime: 0,
	duration: 0,
	bufferedEnd: 0,
	volume: 100,
	muted: false,
	isFullscreen: false,
	playbackRate: 1,
};

/**
 * Subscribes once to a flowplayer instance's native + flowplayer-specific events and exposes
 * a single source of truth for the custom control bar. Leaf controls never register their own
 * player listeners - they read this state and call these actions instead.
 *
 * `playerRef` must be a ref (not a plain value) to avoid stale closures in the event handlers -
 * same trick already used in FlowPlayer.internal.tsx. `playerInstance` only exists to trigger the
 * effect to re-subscribe when the underlying player is (re)created.
 */
export function useFlowplayerState(
	playerRef: MutableRefObject<Player | null>,
	playerInstance: unknown
): [FlowplayerControlsState, FlowplayerControlsActions] {
	const [state, setState] = useState<FlowplayerControlsState>(INITIAL_STATE);
	const seekingRef = useRef(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: playerInstance intentionally re-triggers the subscription when the player is (re)created; only playerRef.current is read
	useEffect(() => {
		const player = playerRef.current;
		if (!player) {
			return;
		}

		const syncFromPlayer = () => {
			setState((prev) => ({
				...prev,
				paused: player.paused,
				duration: player.duration || 0,
				volume: Math.round((player.volume ?? 1) * 100),
				muted: player.muted,
				playbackRate: player.playbackRate || 1,
				currentTime: seekingRef.current ? prev.currentTime : player.currentTime || 0,
			}));
		};

		const handleTimeUpdate = () => {
			if (seekingRef.current) {
				return;
			}
			setState((prev) => ({ ...prev, currentTime: player.currentTime || 0 }));
		};

		const handleProgress = () => {
			const buffered = player.buffered;
			const bufferedEnd = buffered?.length ? buffered.end(buffered.length - 1) : 0;
			setState((prev) => ({ ...prev, bufferedEnd }));
		};

		const handleVolumeChange = () => {
			setState((prev) => ({
				...prev,
				volume: Math.round((player.volume ?? 1) * 100),
				muted: player.muted,
			}));
		};

		const handlePlayPause = () => setState((prev) => ({ ...prev, paused: player.paused }));
		const handleDurationChange = () => setState((prev) => ({ ...prev, duration: player.duration || 0 }));
		const handleRateChange = () =>
			setState((prev) => ({ ...prev, playbackRate: player.playbackRate || 1 }));
		const handleFullscreenEnter = () => setState((prev) => ({ ...prev, isFullscreen: true }));
		const handleFullscreenExit = () => setState((prev) => ({ ...prev, isFullscreen: false }));

		syncFromPlayer();

		player.on('play', handlePlayPause);
		player.on('pause', handlePlayPause);
		player.on('playing', handlePlayPause);
		player.on('ended', handlePlayPause);
		player.on('timeupdate', handleTimeUpdate);
		player.on('durationchange', handleDurationChange);
		player.on('progress', handleProgress);
		player.on('volumechange', handleVolumeChange);
		player.on('ratechange', handleRateChange);
		player.on('fullscreenenter', handleFullscreenEnter);
		player.on('fullscreenexit', handleFullscreenExit);

		return () => {
			player.off('play', handlePlayPause);
			player.off('pause', handlePlayPause);
			player.off('playing', handlePlayPause);
			player.off('ended', handlePlayPause);
			player.off('timeupdate', handleTimeUpdate);
			player.off('durationchange', handleDurationChange);
			player.off('progress', handleProgress);
			player.off('volumechange', handleVolumeChange);
			player.off('ratechange', handleRateChange);
			player.off('fullscreenenter', handleFullscreenEnter);
			player.off('fullscreenexit', handleFullscreenExit);
		};
	}, [playerRef, playerInstance]);

	const togglePlay = useCallback(() => {
		const player = playerRef.current as PlayerWithTransitionState | null;
		if (!player) {
			return;
		}
		const wasPaused = player.paused;
		player.togglePlay();
		if (typeof player.transitionState === 'function') {
			player.transitionState(
				wasPaused ? 'is-playing' : 'is-paused',
				wasPaused ? 'is-paused' : 'is-playing',
				NATIVE_TOGGLE_FLASH_DURATION_MS
			);
		}
	}, [playerRef]);

	const seek = useCallback(
		(time: number) => {
			if (!playerRef.current || !Number.isFinite(time)) {
				return;
			}
			playerRef.current.currentTime = time;
			setState((prev) => ({ ...prev, currentTime: time }));
		},
		[playerRef]
	);

	const enqueueSeek = useCallback(
		(direction: 1 | -1) => {
			const player = playerRef.current as PlayerWithEnqueueSeek | null;
			if (!player || typeof player.enqueueSeek !== 'function') {
				return;
			}
			const opts = player.opts as { keyboard?: { seek_step?: number | string } };
			const configuredStep = Number(opts?.keyboard?.seek_step);
			const step = Number.isFinite(configuredStep) && configuredStep > 0
				? configuredStep
				: DEFAULT_NATIVE_SEEK_STEP_SECONDS;
			player.enqueueSeek(direction * step);
		},
		[playerRef]
	);

	const setSeeking = useCallback((seeking: boolean) => {
		seekingRef.current = seeking;
	}, []);

	const setVolume = useCallback(
		(volume: number) => {
			if (!playerRef.current) {
				return;
			}
			const clamped = Math.max(0, Math.min(100, volume));
			playerRef.current.volume = clamped / 100;
			if (clamped > 0 && playerRef.current.muted) {
				playerRef.current.muted = false;
			}
		},
		[playerRef]
	);

	const toggleMute = useCallback(() => {
		if (playerRef.current) {
			playerRef.current.muted = !playerRef.current.muted;
		}
	}, [playerRef]);

	const toggleFullscreen = useCallback(() => {
		playerRef.current?.toggleFullScreen();
	}, [playerRef]);

	const setPlaybackRate = useCallback(
		(rate: number) => {
			if (playerRef.current) {
				playerRef.current.playbackRate = rate;
			}
		},
		[playerRef]
	);

	return [
		state,
		{
			togglePlay,
			seek,
			enqueueSeek,
			setSeeking,
			setVolume,
			toggleMute,
			toggleFullscreen,
			setPlaybackRate,
		},
	];
}
