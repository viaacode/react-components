import type { Player } from '@flowplayer/player';

/**
 * Flowplayer's subtitles plugin bolts non-standard `is_active`/`default` fields onto native
 * TextTrack objects - undocumented internal behaviour (checked against 3.32.1's plugins/subtitles.js),
 * re-verify on any @flowplayer/player upgrade.
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

/** A stable id for a track. `language`/`label` alone can collide (e.g. two "en" tracks), so ties break by position. */
export function getSubtitleTrackKey(tracks: FlowplayerTextTrack[], track: FlowplayerTextTrack): string {
	const base = track.language || track.label || 'track';
	const sameBase = tracks.filter((candidate) => (candidate.language || candidate.label || 'track') === base);
	if (sameBase.length <= 1) {
		return base;
	}
	return `${base}-${sameBase.indexOf(track)}`;
}

export function getActiveSubtitleTrackKey(player: Player): string | null {
	const tracks = getSubtitleTracks(player);
	const active = tracks.find((track) => track.is_active);
	return active ? getSubtitleTrackKey(tracks, active) : null;
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

	const tracks = getSubtitleTracks(player);
	const target = tracks.find((track) => getSubtitleTrackKey(tracks, track) === trackKey);
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
