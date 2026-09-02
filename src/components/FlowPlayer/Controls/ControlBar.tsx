import clsx from 'clsx';
import { type CSSProperties, type FC, useEffect, useState } from 'react';
import type { ControlBarProps } from './ControlBar.types';
import {
	DEFAULT_AUTO_HIDE_DELAY_MS,
	DEFAULT_PERSISTENCE_KEY_PREFIX,
	DEFAULT_VOLUME_STEPS,
	defaultControlsColors,
	defaultControlsLabels,
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

export const ControlBar: FC<ControlBarProps> = ({
	playerRef,
	playerInstance,
	config = {},
	isAudio,
	hasSubtitles,
	cuepoints,
	speed,
	containerRef,
}) => {
	const {
		showPlayPause = true,
		showProgressBar = true,
		showTimestamps = true,
		showVolume = true,
		showSubtitles,
		showFullscreen = true,
		showSpeed,
		showPeak = true,
		volumeSteps = DEFAULT_VOLUME_STEPS,
		peakMode = 'data',
		peakColorActive,
		peakColorInactive,
		peakColorBackground,
		autoHideDelayMs = DEFAULT_AUTO_HIDE_DELAY_MS,
		persistPreferences = true,
		persistenceKeyPrefix = DEFAULT_PERSISTENCE_KEY_PREFIX,
		colors = {},
		labels = {},
	} = config;

	const mergedColors = { ...defaultControlsColors, ...colors };
	const mergedLabels = { ...defaultControlsLabels, ...labels };

	const resolvedShowSubtitles = showSubtitles ?? hasSubtitles;
	const resolvedShowSpeed = showSpeed ?? !!speed?.options?.length;

	const [state, actions] = useFlowplayerState(playerRef, playerInstance);

	const [subtitleTracks, setSubtitleTracks] = useState<SubtitleTrackOption[]>([]);
	const [activeSubtitleTrackKey, setActiveSubtitleTrackKey] = useState<string | null>(null);
	const [volumeFlyoutOpen, setVolumeFlyoutOpen] = useState(false);
	const [speedFlyoutOpen, setSpeedFlyoutOpen] = useState(false);
	const [subtitlesFlyoutOpen, setSubtitlesFlyoutOpen] = useState(false);

	// Sync once the player exists / is (re)created, and again whenever the plugin reports a
	// track change (loaded/selected/deselected), before any stored preference is restored.
	// biome-ignore lint/correctness/useExhaustiveDependencies: playerInstance intentionally re-triggers this sync when the player is (re)created; only playerRef.current is read
	useEffect(() => {
		const player = playerRef.current;
		if (!player) {
			return;
		}

		const syncTracks = () => {
			setSubtitleTracks(
				getSubtitleTracks(player).map((track) => ({
					key: getSubtitleTrackKey(track),
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
		onRestore: (storedTrackKey) => {
			if (!playerRef.current) {
				return;
			}
			selectSubtitleTrack(playerRef.current, storedTrackKey);
			setActiveSubtitleTrackKey(storedTrackKey);
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
	// over the video/audio area (not only over the pill row) keeps the controls revealed.
	const isVisible = useAutoHideControls({
		containerRef,
		delayMs: autoHideDelayMs,
		isPlaying: !state.paused,
		suppress: volumeFlyoutOpen || speedFlyoutOpen || subtitlesFlyoutOpen,
	});

	// The title/logo overlays are DOM children of `.fp-ui`, created imperatively by
	// FlowPlayer.internal.tsx - not something this component renders or controls directly. A
	// class on the shared player root lets ControlBar.scss fade them in sync with this same
	// visibility signal without either side needing a reference to the other's DOM nodes.
	useEffect(() => {
		const container = containerRef.current;
		if (!container) {
			return;
		}
		container.classList.toggle('c-video-player-inner--controls-hidden', !isVisible);
		return () => {
			container.classList.remove('c-video-player-inner--controls-hidden');
		};
	}, [containerRef, isVisible]);

	const handleKeyDown = useKeyboardShortcuts({
		state,
		actions,
		volumeStepPercent: 100 / volumeSteps,
	});

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
		// `display: contents` keeps this a plain layout no-op (PeakDisplay/the bar position
		// themselves against `.c-video-player-inner`, same as before) while still being a real
		// DOM/React ancestor - needed so a keydown from any focused control below bubbles through
		// one place for the space/f/m/arrow safety net (see useKeyboardShortcuts.ts). It's not a
		// widget in its own right, so it takes no role/tabIndex of its own.
		// biome-ignore lint/a11y/noStaticElementInteractions: event-delegation wrapper only, every actually-interactive element inside already has its own role/tabIndex
		<div style={{ display: 'contents' }} onKeyDown={handleKeyDown}>
			{/* Rendered as a sibling of the control bar, not a flex item inside it - like the
			data-mode `.c-peak` canvas, this needs to fill the whole video/audio area, not sit
			inside the bottom pill row. */}
			{isAudio && showPeak && peakMode === 'generic' && (
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
							onSeekStart={() => actions.setSeeking(true)}
							onSeekEnd={() => actions.setSeeking(false)}
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
							<VolumeControl
								id="flowplayer-controls"
								volume={state.volume}
								muted={state.muted}
								steps={volumeSteps}
								onVolumeChange={actions.setVolume}
								onToggleMute={actions.toggleMute}
								accentColor={mergedColors.accentColor}
								flyoutBackground={mergedColors.flyoutBackground}
								flyoutForegroundColor={mergedColors.flyoutForeground}
								labels={mergedLabels}
								isOpen={volumeFlyoutOpen}
								onOpen={() => setVolumeFlyoutOpen(true)}
								onClose={() => setVolumeFlyoutOpen(false)}
							/>
						)}

						{resolvedShowSubtitles && (
							<SubtitlesControl
								id="flowplayer-controls"
								tracks={subtitleTracks}
								activeTrackKey={activeSubtitleTrackKey}
								onSelect={handleSelectSubtitleTrack}
								offLabel={mergedLabels.subtitlesOff}
								triggerLabel={mergedLabels.subtitles}
								flyoutForegroundColor={mergedColors.flyoutForeground}
								flyoutBackground={mergedColors.flyoutBackground}
								isOpen={subtitlesFlyoutOpen}
								onOpen={() => setSubtitlesFlyoutOpen(true)}
								onClose={() => setSubtitlesFlyoutOpen(false)}
							/>
						)}

						{hasSpeedOptions && (
							<SpeedControl
								id="flowplayer-controls"
								options={speed?.options ?? []}
								labelsForOptions={speed?.labels}
								currentRate={state.playbackRate}
								onChange={actions.setPlaybackRate}
								label={mergedLabels.speed}
								flyoutBackground={mergedColors.flyoutBackground}
								flyoutForegroundColor={mergedColors.flyoutForeground}
								accentColor={mergedColors.accentColor}
								isOpen={speedFlyoutOpen}
								onOpen={() => setSpeedFlyoutOpen(true)}
								onClose={() => setSpeedFlyoutOpen(false)}
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
