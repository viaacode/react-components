import clsx from 'clsx';
import { type CSSProperties, type FC, useCallback, useEffect, useId, useMemo, useState } from 'react';
import type { ControlBarProps } from './ControlBar.types';
import type { FlowPlayerControlsColors, FlowPlayerControlsLabels } from '../FlowPlayer.types';
import {
	DEFAULT_AUTO_HIDE_DELAY_MS,
	DEFAULT_PERSISTENCE_KEY_PREFIX,
	defaultControlsColors,
	defaultControlsLabels,
	isGenericPeakMode,
} from './Controls.consts';
import { FullscreenButton } from './FullscreenButton';
import { PeakDisplay } from './PeakDisplay';
import { PlayPauseButton } from './PlayPauseButton';
import { ProgressBar } from './ProgressBar';
import { SpeedControl } from './SpeedControl';
import type { SubtitleTrackOption } from './SubtitlesControl';
import { SubtitlesControl } from './SubtitlesControl';
import {
	getActiveSubtitleTrackKey,
	getSubtitleTrackKey,
	getSubtitleTracks,
	selectSubtitleTrack,
} from './subtitles-track.helpers';
import { useAutoHideControls } from './useAutoHideControls';
import { useFlowplayerState } from './useFlowplayerState';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';
import { useSubtitlesPersistence } from './useSubtitlesPersistence';
import { VolumeControl } from './VolumeControl';

import './ControlBar.scss';

type FlyoutId = 'subtitles' | 'speed';

// Stable identities for unset `config`/`colors`/`labels` - a `= {}` default in a destructuring
// pattern allocates a new object every render, which would defeat the `useMemo`s below keyed on
// `colors`/`labels` whenever the caller doesn't override them (the common case).
const EMPTY_CONFIG: NonNullable<ControlBarProps['config']> = {};
const EMPTY_COLORS: NonNullable<FlowPlayerControlsColors> = {};
const EMPTY_LABELS: NonNullable<FlowPlayerControlsLabels> = {};

export const ControlBar: FC<ControlBarProps> = ({
	playerRef,
	playerInstance,
	config = EMPTY_CONFIG,
	isAudio,
	hasSubtitles,
	cuepoints,
	speed,
	containerRef,
	hasStartedPlaying,
}) => {
	const {
		showPlayPause = true,
		showProgressBar = true,
		showTimestamps = true,
		showVolume = true,
		showSubtitles,
		showFullscreen = true,
		showSpeed,
		showPeak,
		peakMode,
		peakColorActive,
		peakColorInactive,
		peakColorBackground,
		autoHideDelayMs = DEFAULT_AUTO_HIDE_DELAY_MS,
		persistPreferences = true,
		persistenceKeyPrefix = DEFAULT_PERSISTENCE_KEY_PREFIX,
		colors = EMPTY_COLORS,
		labels = EMPTY_LABELS,
	} = config;

	// Stable per-instance id for the flyout dropdowns - avoids id collisions with multiple players on one page.
	const controlsId = useId();

	const mergedColors = useMemo(() => ({ ...defaultControlsColors, ...colors }), [colors]);
	const mergedLabels = useMemo(() => ({ ...defaultControlsLabels, ...labels }), [labels]);

	const resolvedShowSubtitles = showSubtitles ?? hasSubtitles;
	const resolvedShowSpeed = showSpeed ?? !!speed?.options?.length;

	const [state, actions] = useFlowplayerState(playerRef, playerInstance);

	const [subtitleTracks, setSubtitleTracks] = useState<SubtitleTrackOption[]>([]);
	const [activeSubtitleTrackKey, setActiveSubtitleTrackKey] = useState<string | null>(null);
	// One "which flyout is open" slot instead of a boolean per flyout - makes them mutually exclusive for free.
	const [openFlyout, setOpenFlyout] = useState<FlyoutId | null>(null);
	const [isSeeking, setIsSeeking] = useState(false);

	// Sync once the player exists / is (re)created, and again whenever the plugin reports a
	// track change (loaded/selected/deselected), before any stored preference is restored.
	// biome-ignore lint/correctness/useExhaustiveDependencies: playerInstance intentionally re-triggers this sync when the player is (re)created; only playerRef.current is read
	useEffect(() => {
		const player = playerRef.current;
		if (!player) {
			return;
		}

		const syncTracks = () => {
			const tracks = getSubtitleTracks(player);
			setSubtitleTracks(
				tracks.map((track) => ({
					key: getSubtitleTrackKey(tracks, track),
					label: track.label || track.language || '',
				}))
			);
			setActiveSubtitleTrackKey(getActiveSubtitleTrackKey(player));
		};

		syncTracks();
		// "tracks:text:updated" isn't in the public event map (see subtitles-track.helpers.ts).
		player.on('tracks:text:updated' as never, syncTracks);
		return () => {
			player.off('tracks:text:updated' as never, syncTracks);
		};
	}, [playerRef, playerInstance]);

	const { persist: persistSubtitles } = useSubtitlesPersistence({
		enabled: persistPreferences,
		keyPrefix: persistenceKeyPrefix,
		isPlayerReady: !!playerInstance,
		hasTracks: subtitleTracks.length > 0,
		onRestore: (storedTrackKey) => {
			if (!playerRef.current) {
				return false;
			}
			const restored = selectSubtitleTrack(playerRef.current, storedTrackKey);
			if (restored) {
				setActiveSubtitleTrackKey(storedTrackKey);
			}
			return restored;
		},
	});

	const handleSelectSubtitleTrack = (trackKey: string | null) => {
		if (!playerRef.current) {
			return;
		}
		selectSubtitleTrack(playerRef.current, trackKey);
		setActiveSubtitleTrackKey(trackKey);
		persistSubtitles(trackKey);
	};

	// Listens on the whole player root, not just the bar itself, so moving the pointer anywhere
	// over the video/audio area (not only over the pill row) keeps the controls revealed. Also
	// suppressed while actively dragging the progress bar - a slow drag (especially touch, which
	// only reveals on `touchstart`) can otherwise sit idle long enough for the inactivity timer to
	// hide the bar mid-gesture.
	const autoHideVisible = useAutoHideControls({
		containerRef,
		delayMs: autoHideDelayMs,
		isPlaying: !state.paused,
		suppress: openFlyout !== null || isSeeking,
	});
	// Matches native's `.is-starting .fp-controls{visibility:hidden}` - stays hidden over the
	// poster until the first playback, same as the native bar this replaces.
	const isVisible = hasStartedPlaying && autoHideVisible;

	// The title/logo overlays are built imperatively by FlowPlayer.internal.tsx, not rendered here -
	// this class lets ControlBar.scss fade them in sync with our own visibility. `containerRef` is
	// the same node whose `className` FlowPlayer.internal.tsx's own memo recomputes from `clsx(...)`
	// on unrelated prop changes (subtitles, speed, ...), which would wipe this class out from under
	// us - no dependency array, so it's reapplied after every render instead of only when isVisible
	// changes.
	useEffect(() => {
		const container = containerRef.current;
		if (!container) {
			return;
		}
		container.classList.toggle('c-video-player-inner--controls-hidden', !isVisible);
		return () => {
			container.classList.remove('c-video-player-inner--controls-hidden');
		};
	});

	const handleKeyDown = useKeyboardShortcuts({ actions });

	const handleSeekStart = useCallback(() => {
		actions.setSeeking(true);
		setIsSeeking(true);
	}, [actions]);
	const handleSeekEnd = useCallback(() => {
		actions.setSeeking(false);
		setIsSeeking(false);
	}, [actions]);
	const openFlyoutHandler = useCallback((id: FlyoutId) => setOpenFlyout(id), []);
	const closeFlyoutHandler = useCallback(
		(id: FlyoutId) => setOpenFlyout((current) => (current === id ? null : current)),
		[]
	);

	const percentagePlayed = state.duration > 0 ? state.currentTime / state.duration : 0;
	const hasSpeedOptions = resolvedShowSpeed && !!speed?.options?.length;
	const hasSecondarySegment = showVolume || resolvedShowSubtitles || hasSpeedOptions;

	const colorVars: CSSProperties = {
		['--flowplayer-controls-bg' as string]: mergedColors.backgroundColor,
		['--flowplayer-controls-fg' as string]: mergedColors.foregroundColor,
		['--flowplayer-controls-accent' as string]: mergedColors.accentColor,
		['--flowplayer-controls-flyout-bg' as string]: mergedColors.flyoutBackground,
	};

	return (
		// `display: contents` keeps this a layout no-op while still being a real DOM ancestor, so a
		// keydown from any focused control below bubbles through one place (useKeyboardShortcuts.ts).
		// biome-ignore lint/a11y/noStaticElementInteractions: event-delegation wrapper only, every interactive element inside already has its own role/tabIndex
		<div style={{ display: 'contents' }} onKeyDown={handleKeyDown}>
			{/* Sibling of the control bar, not a flex item inside it - fills the whole video/audio area. */}
			{isAudio && isGenericPeakMode(showPeak, peakMode) && (
				<PeakDisplay
					percentagePlayed={percentagePlayed}
					colorActive={peakColorActive}
					colorInactive={peakColorInactive}
					colorBackground={peakColorBackground}
				/>
			)}

			<div
				className={clsx('c-flowplayer-control-bar', {
					'c-flowplayer-control-bar--hidden': !isVisible,
				})}
				data-flowplayer-controls=""
				style={colorVars}
			>
				{/* Four independently-styled pill segments, matching the design - not one continuous bar. */}
				{showPlayPause && (
					<div className="c-flowplayer-control-bar__segment c-flowplayer-control-bar__segment--icon">
						<PlayPauseButton
							paused={state.paused}
							onToggle={actions.togglePlay}
							labels={mergedLabels}
						/>
					</div>
				)}

				{showProgressBar && (
					<div className="c-flowplayer-control-bar__segment c-flowplayer-control-bar__segment--progress">
						<ProgressBar
							currentTime={state.currentTime}
							duration={state.duration}
							bufferedEnd={state.bufferedEnd}
							onSeek={actions.seek}
							onSeekStart={handleSeekStart}
							onSeekEnd={handleSeekEnd}
							showTimestamps={showTimestamps}
							cuepoints={cuepoints}
							accentColor={mergedColors.accentColor}
							foregroundColor={mergedColors.foregroundColor}
							ariaLabel={mergedLabels.progressBar}
						/>
					</div>
				)}

				{hasSecondarySegment && (
					<div className="c-flowplayer-control-bar__segment c-flowplayer-control-bar__segment--secondary">
						{showVolume && (
							<VolumeControl muted={state.muted} onToggleMute={actions.toggleMute} labels={mergedLabels} />
						)}

						{resolvedShowSubtitles && (
							<SubtitlesControl
								id={controlsId}
								tracks={subtitleTracks}
								activeTrackKey={activeSubtitleTrackKey}
								onSelect={handleSelectSubtitleTrack}
								offLabel={mergedLabels.subtitlesOff}
								triggerLabel={mergedLabels.subtitles}
								flyoutForegroundColor={mergedColors.flyoutForeground}
								flyoutBackground={mergedColors.flyoutBackground}
								isOpen={openFlyout === 'subtitles'}
								onOpen={() => openFlyoutHandler('subtitles')}
								onClose={() => closeFlyoutHandler('subtitles')}
							/>
						)}

						{hasSpeedOptions && (
							<SpeedControl
								id={controlsId}
								options={speed?.options ?? []}
								labelsForOptions={speed?.labels}
								currentRate={state.playbackRate}
								onChange={actions.setPlaybackRate}
								label={mergedLabels.speed}
								flyoutBackground={mergedColors.flyoutBackground}
								flyoutForegroundColor={mergedColors.flyoutForeground}
								accentColor={mergedColors.accentColor}
								isOpen={openFlyout === 'speed'}
								onOpen={() => openFlyoutHandler('speed')}
								onClose={() => closeFlyoutHandler('speed')}
							/>
						)}
					</div>
				)}

				{showFullscreen && (
					<div className="c-flowplayer-control-bar__segment c-flowplayer-control-bar__segment--icon">
						<FullscreenButton
							isFullscreen={state.isFullscreen}
							onToggle={actions.toggleFullscreen}
							labels={mergedLabels}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
