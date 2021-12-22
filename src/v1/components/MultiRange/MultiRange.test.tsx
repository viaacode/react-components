import { mount } from 'enzyme';
import React from 'react';

import { MultiRange } from './MultiRange';

const customClass = 'c-input-custom';

describe('<MultiRange />', () => {
	it('Should be able to render', () => {
		mount(<MultiRange />);
	});

	it('Should set the correct className', () => {
		const multiRangeComponent = mount(<MultiRange className={customClass} />);

		expect(multiRangeComponent.hasClass(customClass)).toEqual(true);
	});

	it('Should pass on the id', () => {
		const id = 'test';

		const multiRangeComponent = mount(<MultiRange id={id} />);

		expect(multiRangeComponent.prop('id')).toEqual(id);
	});

	it('Should be able to set the disabled state', () => {
		const multiRangeComponent = mount(<MultiRange disabled />);

		expect(multiRangeComponent.find('div').at(0).hasClass('c-input-range__disabled')).toEqual(
			true
		);
	});
});
