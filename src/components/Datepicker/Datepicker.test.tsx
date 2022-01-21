import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';

import Datepicker from './Datepicker';
import { futureDatepicker, historicDatepicker } from './Datepicker.const';
import { DatepickerProps } from './Datepicker.types';

const vendor = 'react-datepicker';

const verifyConfiguration = async (props: Partial<DatepickerProps>) => {
	const container = document.createElement('div');
	const onChange = jest.fn();

	await act(async () => {
		render(<Datepicker {...props} onChange={onChange} />, { container });
	});

	const wrapper = container.getElementsByClassName(`${vendor}-wrapper c-datepicker`);
	expect(wrapper.length).toEqual(1);

	const field = wrapper[0].getElementsByTagName('input');
	expect(field.length).toEqual(1);

	await act(async () => {
		fireEvent.click(field[0]);
	});

	const calendar = container.getElementsByClassName(`${vendor} c-datepicker`);
	expect(calendar.length).toEqual(1);

	const days = calendar[0].getElementsByClassName(`${vendor}__day`);
	expect(days.length).toBeGreaterThan(0);

	const disabled = calendar[0].getElementsByClassName(`${vendor}__day--disabled`);
	expect(disabled.length).toBeGreaterThan(0);

	const monthDropdown = calendar[0].getElementsByClassName(`${vendor}__month-dropdown-container`);
	expect(monthDropdown.length).toBeGreaterThan(0);

	const yearDropdown = calendar[0].getElementsByClassName(`${vendor}__year-dropdown-container`);
	expect(yearDropdown.length).toBeGreaterThan(0);

	return { container, onChange };
};

describe('<Datepicker />', () => {
	it('Should be able to render, showing an input field by default', async () => {
		const container = document.createElement('div');
		const onChange = jest.fn();

		await act(async () => {
			render(<Datepicker onChange={onChange} />, { container });
		});

		const wrapper = container.getElementsByClassName(`${vendor}-wrapper c-datepicker`);

		expect(wrapper.length).toEqual(1);
		expect(wrapper[0].getElementsByTagName('input').length).toEqual(1);
	});

	it('Should be able to create and show a datepicker for future dates', async () => {
		const { container, onChange } = await verifyConfiguration(futureDatepicker);

		await act(async () => {
			// First day element will always be in the past
			fireEvent.click(
				container
					.getElementsByClassName(`${vendor} c-datepicker`)[0]
					.getElementsByClassName(`${vendor}__day`)[0]
			);
		});

		expect(onChange).toHaveBeenCalledTimes(0);
	});

	it('Should be able to create and show a datepicker for historic dates', async () => {
		const { container, onChange } = await verifyConfiguration(historicDatepicker);

		await act(async () => {
			// First day element will always be in the past
			fireEvent.click(
				container
					.getElementsByClassName(`${vendor} c-datepicker`)[0]
					.getElementsByClassName(`${vendor}__day`)[0]
			);
		});

		expect(onChange).toHaveBeenCalledTimes(1);
	});
});
