import type { Player } from '@flowplayer/player';
import { act, renderHook } from '@testing-library/react';
import { createRef, type MutableRefObject } from 'react';
import { useFlowplayerState } from './useFlowplayerState';

type Handler = () => void;

/**
 * Enough of a player to drive the volume/mute logic, including the two Flowplayer behaviours it
 * has to work around: `volumechange` firing on every volume write, and Flowplayer's own listener
 * latching `muted` on at volume 0 without ever releasing it.
 */
function buildPlayer() {
	const handlers: Record<string, Handler[]> = {};
	const emit = (event: string) => {
		for (const handler of [...(handlers[event] ?? [])]) {
			handler();
		}
	};

	const player = {
		paused: true,
		duration: 100,
		currentTime: 0,
		playbackRate: 1,
		muted: false,
		buffered: { length: 0 },
		_volume: 0.6,
		get volume() {
			return this._volume;
		},
		set volume(next: number) {
			this._volume = next;
			emit('volumechange');
		},
		_storage: { setItem: jest.fn(), removeItem: jest.fn() },
		on: (event: string, handler: Handler) => {
			handlers[event] = [...(handlers[event] ?? []), handler];
		},
		off: (event: string, handler: Handler) => {
			handlers[event] = (handlers[event] ?? []).filter((entry) => entry !== handler);
		},
		toggleMute: jest.fn(),
	};

	// Flowplayer's own listener, registered at init and therefore ahead of the hook's.
	player.on('volumechange', () => {
		player.muted = player.volume === 0 || player.muted;
	});

	return { player, emit };
}

const renderState = (player: ReturnType<typeof buildPlayer>['player']) => {
	const ref = createRef() as MutableRefObject<Player | null>;
	ref.current = player as unknown as Player;
	return renderHook(() => useFlowplayerState(ref, player));
};

describe('useFlowplayerState volume', () => {
	// Regression: Flowplayer's keyboard plugin lowers `player.volume` directly, so the volume could
	// be walked down to 0 - latching `muted` - and then back up while the player stayed silent.
	it('releases the mute latch when the volume rises again', () => {
		const { player } = buildPlayer();
		const { result } = renderState(player);

		act(() => {
			player.volume = 0;
		});
		expect(player.muted).toBe(true);
		expect(result.current[0].muted).toBe(true);

		act(() => {
			player.volume = 0.15;
		});

		expect(player.muted).toBe(false);
		expect(result.current[0]).toMatchObject({ muted: false, volume: 15 });
	});

	it('leaves a deliberate mute alone while the volume stays put', () => {
		const { player, emit } = buildPlayer();
		const { result } = renderState(player);

		act(() => {
			player.muted = true;
			emit('volumechange');
		});

		expect(player.muted).toBe(true);
		expect(result.current[0]).toMatchObject({ muted: true, volume: 60 });
	});

	it('nudges volume relative to the live player value and unmutes on the way up', () => {
		const { player } = buildPlayer();
		const { result } = renderState(player);

		act(() => {
			player.volume = 0;
		});
		expect(player.muted).toBe(true);

		act(() => {
			result.current[1].adjustVolume(15);
		});

		expect(player.volume).toBeCloseTo(0.15);
		expect(player.muted).toBe(false);
	});

	it('clamps a nudge to the ends of the range', () => {
		const { player } = buildPlayer();
		const { result } = renderState(player);

		act(() => {
			result.current[1].adjustVolume(80);
		});
		expect(player.volume).toBe(1);

		act(() => {
			result.current[1].adjustVolume(-500);
		});
		expect(player.volume).toBe(0);
	});
});
