import type { Player } from '@flowplayer/player';

// `_storage` is Flowplayer's own PlayerStorage: it namespaces keys as `flowplayer/<key>`, resolves
// localStorage -> sessionStorage -> in-memory, and already try/catches. Excluded from the public
// types, same category as `transitionState`/`enqueueSeek` in useFlowplayerState.ts.
// Version-pinned to 3.32.1 (package.json); re-verify on upgrade.
interface PlayerWithStorage extends Player {
	_storage?: {
		setItem: (key: string, value: string) => void;
		removeItem: (key: string) => void;
	};
}

/**
 * Mirrors what Flowplayer's own volume bar writes in its `onseek` handler. That widget is still
 * instantiated under `controls: false` but gets a zero-size rect, so its handler never runs - while
 * the matching read still happens at init. This is the single write that closes that gap.
 */
export function persistVolume(player: Player, volume: number): void {
	const storage = (player as PlayerWithStorage)._storage;
	if (!storage) {
		// Silently skipping here surfaces as "volume randomly stopped being remembered" - name it.
		console.error(
			'FlowPlayer: player._storage is unavailable, volume will not be remembered. Flowplayer internals may have changed (pinned to 3.32.1).'
		);
		return;
	}
	if (volume > 0) {
		storage.removeItem('mute');
	}
	storage.setItem('volume', String(volume));
}
