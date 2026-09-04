import type { Player } from '@flowplayer/player';
import { type MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

// `transitionState` is Flowplayer's own undocumented state-transition helper, not in the public
// API - it produces the native "is-toggling" play/pause flash, which `player.togglePlay()` alone
// doesn't trigger. Calling it ourselves reproduces that flash for our custom button.
// Version-pinned to 3.32.1 (package.json); re-verify on upgrade.
interface PlayerWithTransitionState extends Player {
	transitionState: (nextState: string, previousState: string, durationMs: number) => void;
}

const NATIVE_TOGGLE_FLASH_DURATION_MS = 300;

// `enqueueSeek` is another undocumented Flowplayer internal (excluded from its public types), same
// category as `transitionState` above. Its own keyboard plugin only seeks when
// `document.activeElement` has `aria-valuenow` (true for our progress bar, not our plain buttons) -
// useKeyboardShortcuts.ts calls this itself to fill that gap for everything else.
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
 * Subscribes once to the player's events and exposes a single source of truth for the control bar -
 * leaf controls read this state and call these actions instead of listening themselves.
 * `playerRef` (not a plain value) avoids stale closures; `playerInstance` only triggers re-subscribing
 * when the player is (re)created.
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

	const toggleMute = useCallback(() => {
		if (!playerRef.current) {
			return;
		}
		const nextMuted = !playerRef.current.muted;
		playerRef.current.muted = nextMuted;
		// Volume is mute/unmute only in custom mode (no granular control) - unmuting always lands
		// back at full volume rather than some other level.
		if (!nextMuted) {
			playerRef.current.volume = 1;
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
			toggleMute,
			toggleFullscreen,
			setPlaybackRate,
		},
	];
}
