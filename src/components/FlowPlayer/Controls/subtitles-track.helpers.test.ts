import type { Player } from '@flowplayer/player';
import { getActiveSubtitleTrackKey, getSubtitleTrackKey, selectSubtitleTrack } from './subtitles-track.helpers';

type FakeTextTrack = TextTrack & { is_active?: boolean; is_hls_embedded?: boolean; track_id?: number };

// jsdom doesn't implement HTMLMediaElement.addTextTrack, so `player.textTracks` is faked directly
// with plain objects - Array.from (used throughout subtitles-track.helpers.ts) works the same on
// a plain array as on a real TextTrackList.
function buildTrack(overrides: Partial<FakeTextTrack> & { kind: TextTrackKind }): FakeTextTrack {
	return {
		label: '',
		language: '',
		mode: 'disabled',
		is_active: false,
		...overrides,
	} as FakeTextTrack;
}

function buildPlayer(tracks: FakeTextTrack[]): { player: Player; hls: { subtitleTrack: number } } {
	const hls = { subtitleTrack: -1 };
	const player = { textTracks: tracks, emit: jest.fn(), hls } as unknown as Player;
	return { player, hls };
}

describe('selectSubtitleTrack', () => {
	it('returns false and selects nothing when the key matches no loaded track', () => {
		const track = buildTrack({ kind: 'subtitles', label: 'Nederlands', language: 'nl' });
		const { player } = buildPlayer([track]);

		expect(selectSubtitleTrack(player, 'nonexistent')).toBe(false);
		expect(getActiveSubtitleTrackKey(player)).toBeNull();
	});

	it('returns true and marks the track active when the key matches', () => {
		const track = buildTrack({ kind: 'subtitles', label: 'Nederlands', language: 'nl' });
		const { player } = buildPlayer([track]);
		const key = getSubtitleTrackKey([track], track);

		expect(selectSubtitleTrack(player, key)).toBe(true);
		expect(track.is_active).toBe(true);
		expect(track.mode).toBe('hidden');
	});

	it('returns true and clears the active track when passed null', () => {
		const track = buildTrack({ kind: 'subtitles', label: 'Nederlands', language: 'nl' });
		const { player } = buildPlayer([track]);
		selectSubtitleTrack(player, getSubtitleTrackKey([track], track));

		expect(selectSubtitleTrack(player, null)).toBe(true);
		expect(track.is_active).toBe(false);
		expect(track.mode).toBe('disabled');
	});

	it('switches the HLS rendition for an HLS-embedded track, mirroring the native subtitles plugin', () => {
		const track = buildTrack({
			kind: 'subtitles',
			label: 'English',
			language: 'en',
			is_hls_embedded: true,
			track_id: 3,
		});
		const { player, hls } = buildPlayer([track]);

		selectSubtitleTrack(player, getSubtitleTrackKey([track], track));

		expect(hls.subtitleTrack).toBe(3);
	});

	it('does not touch the HLS rendition for a non-HLS-embedded track', () => {
		const track = buildTrack({ kind: 'subtitles', label: 'English', language: 'en' });
		const { player, hls } = buildPlayer([track]);

		selectSubtitleTrack(player, getSubtitleTrackKey([track], track));

		expect(hls.subtitleTrack).toBe(-1);
	});
});
