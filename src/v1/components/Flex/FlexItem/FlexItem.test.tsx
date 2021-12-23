import { mount, shallow } from 'enzyme';
import React from 'react';

import { FlexItem } from './FlexItem';

describe('<Flex />', () => {
	it('Should be able to render', () => {
		shallow(<FlexItem />);
	});

	it('Should set the correct className', () => {
		const customClass = 'c-flex-item-custom';

		const flexComponent = shallow(<FlexItem className={customClass} />);

		expect(flexComponent.hasClass(customClass)).toEqual(true);
		expect(flexComponent.hasClass('o-flex__item')).toEqual(true);
	});

	it('Should set the correct className when shrink is passed (string)', () => {
		const flexComponent = shallow(<FlexItem shrink />);

		expect(flexComponent.hasClass('o-flex__item--shrink')).toEqual(true);
	});

	it('Should correctly pass children', () => {
		const flexComponent = mount(
			<FlexItem>
				<p>What a nice smile you have there!</p>
			</FlexItem>
		);

		const paragraph = flexComponent.find('p');

		expect(flexComponent.html()).toContain(paragraph.html());
	});
});
