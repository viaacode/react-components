import { ReactDatePickerProps } from 'react-datepicker';

const now = new Date();
const inTwoWeeks = new Date(now.valueOf() + 86400000 * 14);

const base: Partial<ReactDatePickerProps> = {
	calendarStartDay: 1,
	showYearDropdown: true,
	showMonthDropdown: true,
	dropdownMode: 'select',
};

export const futureDatepicker: Partial<ReactDatePickerProps> = {
	...base,
	minDate: now,
	maxDate: inTwoWeeks,
};

export const historicDatepicker: Partial<ReactDatePickerProps> = {
	...base,
	maxDate: now,
};
