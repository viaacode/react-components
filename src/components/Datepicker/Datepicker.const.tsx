import { addYears, endOfYear } from 'date-fns/esm';
import { nlBE } from 'date-fns/locale';
import { ReactDatePickerProps } from 'react-datepicker';

const base: Partial<ReactDatePickerProps> = {
	calendarStartDay: 1,
	showYearDropdown: true,
	showMonthDropdown: true,
	locale: nlBE,
	dropdownMode: 'select',
};

export const future: Partial<ReactDatePickerProps> = {
	...base,
	minDate: new Date(), // Now
	maxDate: endOfYear(addYears(new Date(), 4)), // Next 5 years
};

export const historic: Partial<ReactDatePickerProps> = {
	...base,
	maxDate: new Date(), // Now
};
