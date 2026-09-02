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
	/** Called once on mount, only if a stored preference exists (null = subtitles off). */
	onRestore: (trackKey: string | null) => void;
}

/**
 * Only the subtitle track selection needs custom persistence - volume/mute already persist via
 * Flowplayer's own internal storage. Confirmed: the subtitles plugin's own `_storage` usage is
 * limited to caption *styling* (font/color/edge-style), not which track is active.
 */
export function useSubtitlesPersistence({ enabled, keyPrefix, onRestore }: UseSubtitlesPersistenceOptions) {
	const hasRestoredRef = useRef(false);
	const onRestoreRef = useRef(onRestore);
	onRestoreRef.current = onRestore;

	useEffect(() => {
		if (!enabled || hasRestoredRef.current) {
			return;
		}
		hasRestoredRef.current = true;
		const stored = readStoredValue(keyPrefix);
		if (stored !== undefined) {
			onRestoreRef.current(stored);
		}
	}, [enabled, keyPrefix]);

	const persist = (trackKey: string | null) => {
		if (enabled) {
			writeStoredValue(keyPrefix, trackKey);
		}
	};

	return { persist };
}
