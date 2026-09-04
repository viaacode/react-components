import { useEffect, useRef } from 'react';

const STORAGE_SUFFIX = 'subtitles-track';
const OFF_VALUE = '__off__';

/** Returns undefined when nothing is stored, null when subtitles were explicitly turned off. */
function readStoredValue(keyPrefix: string): string | null | undefined {
	try {
		const raw = window.localStorage.getItem(`${keyPrefix}:${STORAGE_SUFFIX}`);
		if (raw === null) {
			return undefined;
		}
		return raw === OFF_VALUE ? null : raw;
	} catch {
		// private browsing / SSR / storage disabled
		return undefined;
	}
}

function writeStoredValue(keyPrefix: string, trackKey: string | null): void {
	try {
		window.localStorage.setItem(`${keyPrefix}:${STORAGE_SUFFIX}`, trackKey ?? OFF_VALUE);
	} catch {
		// private browsing / SSR / storage disabled
	}
}

export interface UseSubtitlesPersistenceOptions {
	/** Whether persistence is turned on at all (`customControlsConfig.persistPreferences`). */
	enabled: boolean;
	keyPrefix: string;
	/**
	 * Whether the underlying flowplayer instance exists yet. Restore is a no-op until this is
	 * true - the control bar mounts (and this hook's effects run) before FlowPlayer.internal.tsx
	 * has actually created the player, so restoring against a not-yet-existing player would
	 * silently do nothing and never be retried.
	 */
	isPlayerReady: boolean;
	/** Called once the player is ready, only if a stored preference exists (null = subtitles off). */
	onRestore: (trackKey: string | null) => void;
}

/**
 * Only the subtitle track selection needs custom persistence - volume/mute already persist via
 * Flowplayer's own internal storage. Confirmed: the subtitles plugin's own `_storage` usage is
 * limited to caption *styling* (font/color/edge-style), not which track is active.
 */
export function useSubtitlesPersistence({
	enabled,
	keyPrefix,
	isPlayerReady,
	onRestore,
}: UseSubtitlesPersistenceOptions) {
	const hasRestoredRef = useRef(false);
	const onRestoreRef = useRef(onRestore);
	onRestoreRef.current = onRestore;

	useEffect(() => {
		if (!enabled || !isPlayerReady || hasRestoredRef.current) {
			return;
		}
		hasRestoredRef.current = true;
		const stored = readStoredValue(keyPrefix);
		if (stored !== undefined) {
			onRestoreRef.current(stored);
		}
	}, [enabled, keyPrefix, isPlayerReady]);

	const persist = (trackKey: string | null) => {
		if (enabled) {
			writeStoredValue(keyPrefix, trackKey);
		}
	};

	return { persist };
}
