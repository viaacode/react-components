import { endOfDay } from 'date-fns/esm';
import { nlBE } from 'date-fns/locale';
import { ReactDatePickerProps } from 'react-datepicker';

const now = new Date();

const base: Partial<ReactDatePickerProps> = {
	dateFormat: 'HH:mm',
	locale: nlBE,
	showTimeSelect: true,
	showTimeSelectOnly: true,
	timeIntervals: 15,
	autoComplete: 'off', // html prop
};

export const timepicker: Partial<ReactDatePickerProps> = {
	...base,
};

export const futureTimepicker: Partial<ReactDatePickerProps> = {
	...base,
	maxTime: endOfDay(now),
	minDate: now,
	minTime: now,
};
