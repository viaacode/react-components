import { formatDuration } from './duration';

// Consolidates what used to be three separate functions (formatDurationMinutesSeconds,
// formatDurationHoursMinutesSeconds, formatDurationAdaptive) into one, driven by `includeHours`
// and `padLeadingUnit`. Every case below that used to be tested against the old functions is kept
// here with its old expected value, EXCEPT the ones marked "(fixed)" - those exercise two real
// bugs the old, naive `Math.abs(numSeconds || 0)` + `Math.round(seconds % 60)` implementation had:
//   - `Infinity || 0` is still `Infinity`, so an Infinity input produced garbage ("Infinity:NaN...")
//   - `Math.round(seconds % 60)` can round up to a literal "60" instead of carrying into minutes
//     (e.g. 59.5s)
// `formatDuration` fixes both by clamping non-finite/negative input to 0 and truncating (not
// rounding) fractional seconds - verified not to affect any whole-second, non-negative input,
// which is the only kind any real call site ever passes.
describe('formatDuration', () => {
	describe('includeHours: never (mm:ss)', () => {
		const format = (n: number | null | undefined) => formatDuration(n, { includeHours: 'never' });

		it('formats whole-second durations the same as the old formatDurationMinutesSeconds', () => {
			expect(format(0)).toEqual('00:00');
			expect(format(20)).toEqual('00:20');
			expect(format(40)).toEqual('00:40');
			expect(format(59)).toEqual('00:59');
			expect(format(60)).toEqual('01:00');
			expect(format(61)).toEqual('01:01');
			expect(format(121)).toEqual('02:01');
			expect(format(3000)).toEqual('50:00');
			expect(format(30000)).toEqual('500:00');
			expect(format(30001.123456)).toEqual('500:01');
		});

		it('truncates fractional seconds instead of rounding (fixed)', () => {
			// Old: formatDurationMinutesSeconds(30001.9523) rounded up to '500:02'.
			expect(format(30001.9523)).toEqual('500:01');
			// Old: formatDurationMinutesSeconds(59.5) rounded up to the invalid '00:60'.
			expect(format(59.5)).toEqual('00:59');
		});

		it('clamps negative and non-finite input to 0 instead of flipping sign or emitting garbage (fixed)', () => {
			// Old: formatDurationMinutesSeconds(-5) flipped the sign via Math.abs to '00:05'.
			expect(format(-5)).toEqual('00:00');
			// Old: formatDurationMinutesSeconds(Infinity) produced 'Infinity:NaN'.
			expect(format(Number.POSITIVE_INFINITY)).toEqual('00:00');
			expect(format(Number.NaN)).toEqual('00:00');
			expect(format(null)).toEqual('00:00');
			expect(format(undefined)).toEqual('00:00');
		});
	});

	describe('includeHours: always (hh:mm:ss)', () => {
		const format = (n: number | null | undefined) => formatDuration(n, { includeHours: 'always' });

		it('formats whole-second durations the same as the old formatDurationHoursMinutesSeconds', () => {
			expect(format(0)).toEqual('00:00:00');
			expect(format(20)).toEqual('00:00:20');
			expect(format(40)).toEqual('00:00:40');
			expect(format(59)).toEqual('00:00:59');
			expect(format(60)).toEqual('00:01:00');
			expect(format(61)).toEqual('00:01:01');
			expect(format(121)).toEqual('00:02:01');
			expect(format(3000)).toEqual('00:50:00');
			expect(format(30000)).toEqual('08:20:00');
			expect(format(30001)).toEqual('08:20:01');
			expect(format(30001.123456)).toEqual('08:20:01');
		});

		it('truncates fractional seconds instead of rounding (fixed)', () => {
			// Old: formatDurationHoursMinutesSeconds(30001.9523) rounded up to '08:20:02'.
			expect(format(30001.9523)).toEqual('08:20:01');
			// Old: formatDurationHoursMinutesSeconds(59.5) rounded up to the invalid '00:00:60'.
			expect(format(59.5)).toEqual('00:00:59');
		});

		it('clamps negative and non-finite input to 0 instead of flipping sign or emitting garbage (fixed)', () => {
			// Old: formatDurationHoursMinutesSeconds(-5) flipped the sign via Math.abs to '00:00:05'.
			expect(format(-5)).toEqual('00:00:00');
			// Old: formatDurationHoursMinutesSeconds(Infinity) produced 'Infinity:NaN:NaN'.
			expect(format(Number.POSITIVE_INFINITY)).toEqual('00:00:00');
			expect(format(Number.NaN)).toEqual('00:00:00');
			expect(format(null)).toEqual('00:00:00');
			expect(format(undefined)).toEqual('00:00:00');
		});

		it('defaults to `always` when no options are passed', () => {
			expect(formatDuration(61)).toEqual('00:01:01');
		});
	});

	describe('includeHours: auto, padLeadingUnit: false (adaptive - unchanged from formatDurationAdaptive)', () => {
		const format = (n: number | null | undefined) =>
			formatDuration(n, { includeHours: 'auto', padLeadingUnit: false });

		it('formats sub-hour durations as m:ss', () => {
			expect(format(0)).toEqual('0:00');
			expect(format(5)).toEqual('0:05');
			expect(format(65)).toEqual('1:05');
		});

		it('formats durations of an hour or more as h:mm:ss', () => {
			expect(format(3661)).toEqual('1:01:01');
			expect(format(3600)).toEqual('1:00:00');
		});

		it('treats negative or non-finite input as 0', () => {
			expect(format(-5)).toEqual('0:00');
			expect(format(Number.NaN)).toEqual('0:00');
			expect(format(Number.POSITIVE_INFINITY)).toEqual('0:00');
			expect(format(null)).toEqual('0:00');
			expect(format(undefined)).toEqual('0:00');
		});
	});

	describe('padLeadingUnit', () => {
		it('pads the leading unit by default', () => {
			expect(formatDuration(5, { includeHours: 'never' })).toEqual('00:05');
			expect(formatDuration(5, { includeHours: 'always' })).toEqual('00:00:05');
		});

		it('leaves the leading unit unpadded when disabled, but still pads the trailing units', () => {
			expect(formatDuration(65, { includeHours: 'never', padLeadingUnit: false })).toEqual('1:05');
			expect(formatDuration(65, { includeHours: 'always', padLeadingUnit: false })).toEqual('0:01:05');
		});
	});
});
