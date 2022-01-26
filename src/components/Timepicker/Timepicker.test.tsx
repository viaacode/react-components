import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';

import Timepicker from './Timepicker';
import { futureTimepicker, timepicker } from './Timepicker.const';
import { TimepickerProps } from './Timepicker.types';

const vendor = 'react-datepicker';

const verifyConfiguration = async (props: Partial<TimepickerProps>, checkDisabled: boolean) => {
	const container = document.createElement('div');
	const onChange = jest.fn();

	await act(async () => {
		render(<Timepicker {...props} onChange={onChange} />, { container });
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

	const days = calendar[0].getElementsByClassName(`${vendor}__time-list-item`);
	expect(days.length).toBeGreaterThan(0);

	if (checkDisabled) {
		const disabled = calendar[0].getElementsByClassName(`${vendor}__time-list-item--disabled`);
		expect(disabled.length).toBeGreaterThan(0);
	}

	return { container, onChange };
};

describe('<Datepicker />', () => {
	it('Should be able to render, showing an input field by default', async () => {
		const container = document.createElement('div');
		const onChange = jest.fn();

		await act(async () => {
			render(<Timepicker onChange={onChange} />, { container });
		});

		const wrapper = container.getElementsByClassName(`${vendor}-wrapper c-datepicker--time`);

		expect(wrapper.length).toEqual(1);
		expect(wrapper[0].getElementsByTagName('input').length).toEqual(1);
	});

	it('Should be able to create and show a timepicker', async () => {
		const { container, onChange } = await verifyConfiguration(timepicker, false);

		await act(async () => {
			const days = container
				.getElementsByClassName(`${vendor} c-datepicker--time`)[0]
				.getElementsByClassName(`${vendor}__time-list-item`);

			fireEvent.click(days[0]);
			fireEvent.click(days[days.length - 1]);
		});

		expect(onChange).toHaveBeenCalledTimes(2);
	});

	it('Should be able to create and show a timepicker for future times', async () => {
		const { container, onChange } = await verifyConfiguration(futureTimepicker, true);

		await act(async () => {
			// Last hour element will always be in the future
			const days = container
				.getElementsByClassName(`${vendor} c-datepicker--time`)[0]
				.getElementsByClassName(`${vendor}__time-list-item`);

			fireEvent.click(days[days.length - 1]);
		});

		expect(onChange).toHaveBeenCalledTimes(1);
	});
});
