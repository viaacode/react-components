import type { Player } from '@flowplayer/player';

/**
 * Flowplayer's subtitles plugin bolts non-standard `is_active`/`default` fields onto native
 * TextTrack objects (verified by reading @flowplayer/player 3.32.1's plugins/subtitles.js -
 * this is undocumented internal behaviour, not covered by that package's public .d.ts or by
 * semver. Re-verify against the plugin source on any upgrade of @flowplayer/player).
 *
 * The same plugin also persists caption *styling* preferences (font/color/edge-style, via a
 * `StyleOpt` class) to its own storage - that's unrelated to which track is active, and isn't
 * replicated here; only track selection is exposed by this control.
 */
type FlowplayerTextTrack = TextTrack & { is_active?: boolean; default?: boolean };

export function getSubtitleTracks(player: Player): FlowplayerTextTrack[] {
	// player.textTracks also contains Flowplayer's own internal tracks (e.g. an "fp-cuepoints"
	// metadata track used for cue-point markers) - only expose actual subtitle/caption tracks.
	return (Array.from(player.textTracks || []) as FlowplayerTextTrack[]).filter(
		(track) => track.kind === 'subtitles' || track.kind === 'captions'
	);
}

export function getActiveSubtitleTrack(player: Player): FlowplayerTextTrack | undefined {
	return getSubtitleTracks(player).find((track) => track.is_active);
}

export function isSubtitlesEnabled(player: Player): boolean {
	return !!getActiveSubtitleTrack(player);
}

/** A stable identifier for a track, suitable for persistence and for matching a track in a list. */
export function getSubtitleTrackKey(track: FlowplayerTextTrack): string {
	return track.language || track.label || '';
}

export function getActiveSubtitleTrackKey(player: Player): string | null {
	const active = getActiveSubtitleTrack(player);
	return active ? getSubtitleTrackKey(active) : null;
}

function emitTracksUpdated(player: Player, track?: FlowplayerTextTrack) {
	// "tracks:text:updated" isn't in the public event map, hence the loose cast.
	(player as unknown as { emit: (event: string, payload?: unknown) => void }).emit(
		'tracks:text:updated',
		track
	);
}

/** Selects a track by key, or pass `null` to turn subtitles off entirely. */
export function selectSubtitleTrack(player: Player, trackKey: string | null): void {
	const currentActive = getActiveSubtitleTrack(player);

	if (trackKey === null) {
		if (currentActive) {
			currentActive.mode = 'disabled';
			currentActive.is_active = false;
			emitTracksUpdated(player);
		}
		return;
	}

	const target = getSubtitleTracks(player).find((track) => getSubtitleTrackKey(track) === trackKey);
	if (!target) {
		return;
	}
	if (currentActive && currentActive !== target) {
		currentActive.mode = 'disabled';
		currentActive.is_active = false;
	}
	target.mode = 'hidden';
	target.is_active = true;
	emitTracksUpdated(player, target);
}
