import { getCuepointsForBar } from './FlowPlayer.helpers';

describe('getCuepointsForBar', () => {
	it('returns undefined when neither start nor end is set', () => {
		expect(getCuepointsForBar(undefined, undefined)).toBeUndefined();
		expect(getCuepointsForBar(null, null)).toBeUndefined();
	});

	it('returns a cuepoint when start is 0 and end is unset', () => {
		// Regression: `end || start` treated `0 || undefined` as falsy and silently dropped a
		// cuepoint that legitimately starts at the beginning of the video.
		expect(getCuepointsForBar(0, undefined)).toEqual([{ startTime: 0, endTime: undefined }]);
	});

	it('returns a cuepoint when end is 0 and start is unset', () => {
		expect(getCuepointsForBar(undefined, 0)).toEqual([{ startTime: undefined, endTime: 0 }]);
	});

	it('returns a cuepoint when both start and end are set', () => {
		expect(getCuepointsForBar(10, 20)).toEqual([{ startTime: 10, endTime: 20 }]);
	});

	it('returns a cuepoint when only start is set to a non-zero value', () => {
		expect(getCuepointsForBar(5, undefined)).toEqual([{ startTime: 5, endTime: undefined }]);
	});
});
