import { mount, shallow } from 'enzyme';
import React from 'react';

import { DatePicker } from './DatePicker';

describe('<DatePicker />', () => {
	it('Should be able to render', () => {
		shallow(<DatePicker />);
	});

	it('Should set the correct className', () => {
		const customClass = 'c-datepicker-custom';

		const datePickerComponent = mount(<DatePicker className={customClass} />);

		const datePickerElement = datePickerComponent.find('.c-input-with-icon');

		expect(datePickerComponent.hasClass(customClass)).toEqual(true);
		expect(datePickerElement.children().length).toEqual(2);
	});

	it('Should be able to set the disabled state', () => {
		const datePickerComponent = mount(<DatePicker disabled />);

		const datePickerElement = datePickerComponent.find('input');

		expect(datePickerElement.prop('disabled')).toEqual(true);
	});

	it('Should be able to set an initial value', () => {
		const defaultDateString = '2019/06/22';
		const defaultDateObject = new Date(defaultDateString);

		const datePickerComponent = mount(<DatePicker value={defaultDateObject} />);

		const datePickerElement = datePickerComponent.find('input');

		expect(datePickerElement.prop('value')).toEqual(
			defaultDateString.split('/').reverse().join('/')
		);
	});

	it('Should be able to set a placeholder value', () => {
		const placeholder = 'dd-mm-yyyy';

		const datePickerComponent = mount(<DatePicker placeholder={placeholder} />);

		const datePickerElement = datePickerComponent.find('input');

		expect(datePickerElement.prop('placeholder')).toEqual(placeholder);
	});

	it('Should call the onChange handler when the input changes', () => {
		const onChangeHandler = jest.fn();

		const datePickerComponent = mount(<DatePicker onChange={onChangeHandler} />);

		const datePickerElement = datePickerComponent.find('input');

		const dateObject1 = new Date('2019-06-11');
		const dateObject2 = new Date('2018-05-10');

		console.log(dateObject1, typeof dateObject1);

		datePickerElement.simulate('change', { target: { value: dateObject1 } });

		expect(onChangeHandler).toHaveBeenCalled();
		expect(onChangeHandler).toHaveBeenCalledTimes(1);
		const firstCall = onChangeHandler.mock.calls[0];
		expect(firstCall[firstCall.length - 1].target.value.getTime()).toEqual(
			dateObject1.getTime()
		);

		datePickerElement.simulate('change', { target: { value: dateObject2 } });

		expect(onChangeHandler).toHaveBeenCalledTimes(2);
		const secondCall = onChangeHandler.mock.calls[1];
		expect(secondCall[secondCall.length - 1].target.value.getTime()).toEqual(
			dateObject2.getTime()
		);
	});
});
