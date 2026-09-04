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
	/** Restore is a no-op until the player actually exists - the control bar mounts before it's created. */
	isPlayerReady: boolean;
	/** Called once the player is ready, only if a stored preference exists (null = subtitles off). */
	onRestore: (trackKey: string | null) => void;
}

/** Only subtitle track selection needs custom persistence - volume/mute persist via Flowplayer's own storage. */
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
