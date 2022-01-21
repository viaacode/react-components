import { ReactDatePickerProps } from 'react-datepicker';

const now = new Date();
const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));

const base: Partial<ReactDatePickerProps> = {
	dateFormat: 'HH:mm',
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
	maxTime: endOfDay,
	minDate: now,
	minTime: now,
};
