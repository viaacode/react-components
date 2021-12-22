import { shallow } from 'enzyme';
import React from 'react';

import { BlockHeading } from './BlockHeading';

describe('<BlockHeading />', () => {
	it('Should be able to render', () => {
		shallow(<BlockHeading type="h1">BlockHeading</BlockHeading>);
	});

	it('should pass a custom className', () => {
		const customClass = 'c-heading-custom';
		const headingComponent = (
			<BlockHeading className={customClass} type="h1">
				Lorem ipsum
			</BlockHeading>
		);

		expect(shallow(headingComponent).hasClass(customClass)).toBeTruthy();
	});

	it('Should correctly pass children', () => {
		const headingComponent = shallow(
			<BlockHeading type="h1">
				<a href="https://viaa.be/">Lorem ipsum</a>
			</BlockHeading>
		);

		const child = headingComponent.find('a');

		expect(headingComponent.children().html()).toEqual(child.html());
	});
});
