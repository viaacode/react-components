export interface FormatDurationOptions {
	/**
	 * `'always'` always includes the hours component (e.g. "00:03:45"); `'never'` never does (e.g.
	 * "03:45", with minutes accumulating past 59 for durations over an hour); `'auto'` includes it
	 * only once the duration reaches an hour (e.g. "3:45" under an hour, "1:03:45" at or above it).
	 * Default `'always'`.
	 */
	includeHours?: 'always' | 'never' | 'auto';
	/**
	 * Zero-pad the leading unit (hours, or minutes when hours are omitted) to 2 digits - e.g.
	 * "03:45" vs "3:45". Default `true`. A fixed-width, always-padded result is required for a
	 * parseable/editable text value (see TimeCropControls); opt out for a live progress readout,
	 * where a padded leading digit reads oddly for what's usually a short duration.
	 */
	padLeadingUnit?: boolean;
}

/**
 * Formats a duration in seconds as `mm:ss` or `hh:mm:ss` (or their unpadded/adaptive variants -
 * see `FormatDurationOptions`). Negative and non-finite input (`NaN`, `Infinity`, `null`,
 * `undefined`) are all treated as 0, and fractional seconds are truncated (not rounded) so a
 * value one tick before a whole second never displays as if it had already reached it.
 */
export function formatDuration(
	numSeconds: number | null | undefined,
	{ includeHours = 'always', padLeadingUnit = true }: FormatDurationOptions = {}
): string {
	const safeSeconds = Number.isFinite(numSeconds) && (numSeconds as number) > 0 ? (numSeconds as number) : 0;
	const totalSeconds = Math.floor(safeSeconds);

	const showHours = includeHours === 'always' || (includeHours === 'auto' && totalSeconds >= 3600);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = showHours ? Math.floor((totalSeconds % 3600) / 60) : Math.floor(totalSeconds / 60);
	const secs = totalSeconds % 60;

	const pad = (n: number) => String(n).padStart(2, '0');
	const leadingUnit = showHours ? hours : minutes;
	const leadingStr = padLeadingUnit ? pad(leadingUnit) : String(leadingUnit);

	return showHours ? `${leadingStr}:${pad(minutes)}:${pad(secs)}` : `${leadingStr}:${pad(secs)}`;
}
