import type { Player } from '@flowplayer/player';
import { type MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { persistVolume } from './volume-persistence';

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
	/** 0-100, matching the percentage Flowplayer's own volume bar passes to its `onseek` handler. */
	setVolume: (volume: number) => void;
	/** Relative nudge in percentage points, for the arrow-key shortcuts. */
	adjustVolume: (delta: number) => void;
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
	// Baseline for the mute-latch release in `handleVolumeChange`.
	const previousVolumeRef = useRef(1);

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
			const volume = player.volume ?? 1;
			const previousVolume = previousVolumeRef.current;
			previousVolumeRef.current = volume;
			// Flowplayer latches `muted` on as soon as the volume reaches 0, but never releases it on
			// the way back up - so anything that moves `player.volume` directly can silence playback
			// and then be unable to restore it. Its own keyboard plugin does exactly that, from
			// anywhere in the player rather than only inside our control bar. Flowplayer's own volume
			// bar releases the latch on any positive volume (`onseek`: `n > 0 && (muted = false)`), so
			// mirror that here for every path that doesn't go through `setVolume`.
			const releasesMuteLatch = player.muted && volume > previousVolume;
			if (releasesMuteLatch) {
				player.muted = false;
			}
			setState((prev) => ({
				...prev,
				volume: Math.round(volume * 100),
				// Not `player.muted` - the assignment above only reaches this state via another
				// volumechange, which would flash the muted icon for a frame first.
				muted: releasesMuteLatch ? false : player.muted,
			}));
		};

		const handlePlayPause = () => setState((prev) => ({ ...prev, paused: player.paused }));
		const handleDurationChange = () =>
			setState((prev) => ({ ...prev, duration: player.duration || 0 }));
		const handleRateChange = () =>
			setState((prev) => ({ ...prev, playbackRate: player.playbackRate || 1 }));
		const handleFullscreenEnter = () => setState((prev) => ({ ...prev, isFullscreen: true }));
		const handleFullscreenExit = () => setState((prev) => ({ ...prev, isFullscreen: false }));

		// Seeded after Flowplayer has restored its stored volume, so that restore never reads as a
		// deliberate rise to the latch release above.
		previousVolumeRef.current = player.volume ?? 1;
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
			const step =
				Number.isFinite(configuredStep) && configuredStep > 0
					? configuredStep
					: DEFAULT_NATIVE_SEEK_STEP_SECONDS;
			player.enqueueSeek(direction * step);
		},
		[playerRef]
	);

	const setSeeking = useCallback((seeking: boolean) => {
		seekingRef.current = seeking;
	}, []);

	// Ported from Flowplayer's own volume-bar `onseek` handler, which is the only place it writes
	// the volume it restores at init - see volume-persistence.ts.
	const setVolume = useCallback(
		(volume: number) => {
			const player = playerRef.current;
			if (!player) {
				return;
			}
			// Not `utils/clamp`: that helper drops its upper bound whenever it actually applies, and
			// `player.volume` throws on anything outside 0-1.
			const clamped = Math.min(Math.max(volume, 0), 100);
			// Flowplayer's own volumechange listener only ever forces mute *on* (`volume === 0 || muted`),
			// never off - without this, dragging up from muted moves the bars silently.
			if (clamped > 0) {
				player.muted = false;
			}
			player.volume = clamped / 100;
			persistVolume(player, player.volume);
		},
		[playerRef]
	);

	// Flowplayer's keyboard plugin does this as a bare `player.volume + delta`, which walks the
	// volume down to 0 - where Flowplayer's own volumechange listener latches `muted` on - and then
	// never releases that latch on the way back up. Going through `setVolume` does.
	// Reads the live `player.volume` rather than React state, so a held arrow key isn't quantised
	// to the render rate.
	const adjustVolume = useCallback(
		(delta: number) => {
			const player = playerRef.current;
			if (!player) {
				return;
			}
			setVolume((player.volume ?? 1) * 100 + delta);
		},
		[playerRef, setVolume]
	);

	// Flowplayer's own `toggleMute` already bumps volume to 1 when unmuting from 0 - the one case
	// where its volumechange listener would otherwise re-mute instantly - and leaves any other level
	// where the user put it.
	const toggleMute = useCallback(() => {
		playerRef.current?.toggleMute();
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
			adjustVolume,
			toggleMute,
			toggleFullscreen,
			setPlaybackRate,
		},
	];
}
