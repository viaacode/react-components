import { mount, shallow } from 'enzyme';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';

import { Flex } from './Flex';

const content = loremIpsum({ count: 1 });
const customClass = 'c-flex-custom';

describe('<Flex />', () => {
	it('Should be able to render', () => {
		shallow(<Flex>{content}</Flex>);
	});

	it('Should set the correct className', () => {
		const flexComponent = shallow(<Flex className={customClass}>{content}</Flex>);

		expect(flexComponent.hasClass(customClass)).toEqual(true);
		expect(flexComponent.hasClass('o-flex')).toEqual(true);
	});

	it('Should set the correct className when orientation is passed', () => {
		const flexComponent = shallow(<Flex orientation="horizontal">{content}</Flex>);

		expect(flexComponent.hasClass('o-flex--horizontal')).toEqual(true);
	});

	it('Should set the correct className when center is passed', () => {
		const flexComponent = shallow(<Flex center>{content}</Flex>);

		expect(flexComponent.hasClass('o-flex--center')).toEqual(true);
	});

	it('Should set the correct className when orientation and center are passed', () => {
		const flexComponent = shallow(
			<Flex orientation="horizontal" center>
				{content}
			</Flex>
		);

		expect(flexComponent.hasClass('o-flex--horizontal-center')).toEqual(true);
	});

	it('Should set the correct className when justify is passed', () => {
		const flexComponent = shallow(<Flex justify="between">{content}</Flex>);

		expect(flexComponent.hasClass('o-flex--justify-between')).toEqual(true);
	});

	it('Should set the correct className when wrap is passed', () => {
		const flexComponent = shallow(<Flex wrap>{content}</Flex>);

		expect(flexComponent.hasClass('o-flex--wrap')).toEqual(true);
	});

	it('Should set the correct className when spaced is passed (boolean)', () => {
		const flexComponent = shallow(<Flex spaced="regular">{content}</Flex>);

		expect(flexComponent.hasClass('o-flex--spaced')).toEqual(true);
	});

	it('Should set the correct className when spaced is passed (wide)', () => {
		const flexComponent = shallow(<Flex spaced="wide">{content}</Flex>);

		expect(flexComponent.hasClass('o-flex--spaced-wide')).toEqual(true);
	});

	it('Should set the correct className when no spaced is passed', () => {
		const flexComponent = shallow(<Flex>{content}</Flex>);

		expect(flexComponent.hasClass('o-flex--spaced')).toEqual(false);
		expect(flexComponent.hasClass('o-flex--spaced-wide')).toEqual(false);
	});

	it('Should correctly pass children', () => {
		const flexComponent = mount(
			<Flex>
				<p>{content}</p>
			</Flex>
		);

		const paragraph = flexComponent.find('p');

		expect(flexComponent.html()).toContain(paragraph.html());
	});
});
