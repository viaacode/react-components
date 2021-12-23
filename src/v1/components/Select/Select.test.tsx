import { mount, shallow } from 'enzyme';
import React from 'react';

import { Select } from './Select';
import { SELECT_MOCK_OPTIONS } from './Select.mock';

const customClass = 'c-select-custom';

describe('<Select />', () => {
	it('Should be able to render', () => {
		shallow(<Select options={SELECT_MOCK_OPTIONS} />);
	});

	it('Should set the correct className', () => {
		const selectComponent = mount(
			<Select className={customClass} options={SELECT_MOCK_OPTIONS} />
		);

		const selectElement = selectComponent.find('div').at(0);

		expect(selectElement.hasClass(customClass)).toEqual(true);
		expect(selectElement.hasClass('c-select')).toEqual(true);
	});

	it('Should correctly render the given options', () => {
		const selectComponent = shallow(<Select options={SELECT_MOCK_OPTIONS} />);

		const optionElements = selectComponent.find('option');

		optionElements.forEach((optionElement, index) => {
			expect(optionElement.prop('value')).toEqual(SELECT_MOCK_OPTIONS[index].value);
			expect(optionElement.text()).toEqual(SELECT_MOCK_OPTIONS[index].label);
			expect(optionElement.prop('disabled')).toEqual(SELECT_MOCK_OPTIONS[index].disabled);
		});
	});

	it('Should be able to set the disabled state', () => {
		const selectComponent = mount(<Select options={SELECT_MOCK_OPTIONS} disabled />);

		const selectElement = selectComponent.find('div').at(0);

		expect(selectElement.hasClass('c-select--is-disabled')).toEqual(true);
	});
});
