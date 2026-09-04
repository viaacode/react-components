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
	/**
	 * Whether at least one subtitle track has loaded. The player can exist before its text tracks
	 * have populated (e.g. an HLS manifest parsed asynchronously); restore retries whenever this
	 * flips, instead of giving up permanently the first time it's tried too early.
	 */
	hasTracks: boolean;
	/**
	 * Called once the player is ready, only if a stored preference exists (null = subtitles off).
	 * Must return whether the restore actually took effect - a `false` return (target track not
	 * loaded yet) keeps the restore retryable instead of marking it done.
	 */
	onRestore: (trackKey: string | null) => boolean;
}

/** Only subtitle track selection needs custom persistence - volume/mute persist via Flowplayer's own storage. */
export function useSubtitlesPersistence({
	enabled,
	keyPrefix,
	isPlayerReady,
	hasTracks,
	onRestore,
}: UseSubtitlesPersistenceOptions) {
	const hasRestoredRef = useRef(false);
	const onRestoreRef = useRef(onRestore);
	onRestoreRef.current = onRestore;

	// biome-ignore lint/correctness/useExhaustiveDependencies: `hasTracks` isn't read in the body, it only re-triggers a retry once tracks that weren't there on the first attempt load
	useEffect(() => {
		if (!enabled || !isPlayerReady || hasRestoredRef.current) {
			return;
		}
		const stored = readStoredValue(keyPrefix);
		if (stored === undefined) {
			hasRestoredRef.current = true;
			return;
		}
		if (onRestoreRef.current(stored)) {
			hasRestoredRef.current = true;
		}
	}, [enabled, keyPrefix, isPlayerReady, hasTracks]);

	const persist = (trackKey: string | null) => {
		if (enabled) {
			writeStoredValue(keyPrefix, trackKey);
		}
	};

	return { persist };
}
