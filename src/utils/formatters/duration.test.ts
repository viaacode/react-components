import { formatDurationHoursMinutesSeconds, formatDurationMinutesSeconds } from './duration';

describe('Formatters - duration', () => {
	it('Should format as a duration`', () => {
		expect(formatDurationMinutesSeconds(-5)).toEqual('00:05');
		expect(formatDurationMinutesSeconds(0)).toEqual('00:00');
		expect(formatDurationMinutesSeconds(20)).toEqual('00:20');
		expect(formatDurationMinutesSeconds(40)).toEqual('00:40');
		expect(formatDurationMinutesSeconds(59)).toEqual('00:59');
		expect(formatDurationMinutesSeconds(60)).toEqual('01:00');
		expect(formatDurationMinutesSeconds(61)).toEqual('01:01');
		expect(formatDurationMinutesSeconds(121)).toEqual('02:01');
		expect(formatDurationMinutesSeconds(3000)).toEqual('50:00');
		expect(formatDurationMinutesSeconds(30000)).toEqual('500:00');
	});

	it('Should format as a duration in houres, monutes and seconds`', () => {
		expect(formatDurationHoursMinutesSeconds(-5)).toEqual('00:00:05');
		expect(formatDurationHoursMinutesSeconds(0)).toEqual('00:00:00');
		expect(formatDurationHoursMinutesSeconds(20)).toEqual('00:00:20');
		expect(formatDurationHoursMinutesSeconds(40)).toEqual('00:00:40');
		expect(formatDurationHoursMinutesSeconds(59)).toEqual('00:00:59');
		expect(formatDurationHoursMinutesSeconds(60)).toEqual('00:01:00');
		expect(formatDurationHoursMinutesSeconds(61)).toEqual('00:01:01');
		expect(formatDurationHoursMinutesSeconds(121)).toEqual('00:02:01');
		expect(formatDurationHoursMinutesSeconds(3000)).toEqual('00:50:00');
		expect(formatDurationHoursMinutesSeconds(30000)).toEqual('08:20:00');
		expect(formatDurationHoursMinutesSeconds(30001)).toEqual('08:20:01');
		expect(formatDurationHoursMinutesSeconds(30001.123456)).toEqual('08:20:01');
		expect(formatDurationHoursMinutesSeconds(30001.9523)).toEqual('08:20:01');
	});
});
