import { addYears, endOfYear } from 'date-fns/esm';
import { nlBE } from 'date-fns/locale';
import { ReactDatePickerProps } from 'react-datepicker';

const now = new Date();

const base: Partial<ReactDatePickerProps> = {
	calendarStartDay: 1,
	showYearDropdown: true,
	showMonthDropdown: true,
	locale: nlBE,
	dropdownMode: 'select',
};

export const future: Partial<ReactDatePickerProps> = {
	...base,
	minDate: now,
	maxDate: endOfYear(addYears(now, 4)), // Next 5 years
};

export const historic: Partial<ReactDatePickerProps> = {
	...base,
	maxDate: now,
};
