import { shallow } from 'enzyme';
import React from 'react';

import { Button } from '../..';

import { ButtonGroup } from './ButtonGroup';

describe('<ButtonGroup />', () => {
	it('Should be able to render', () => {
		shallow(
			<ButtonGroup>
				<Button label="test1" />
				<Button label="test2" />
			</ButtonGroup>
		);
	});

	it('Should set the correct className', () => {
		const customClass = 'c-button-group-custom';
		const buttonGroupComponent = shallow(
			<ButtonGroup className={customClass}>
				<Button label="test1" />
				<Button label="test2" />
			</ButtonGroup>
		);

		expect(buttonGroupComponent.hasClass('c-button-group')).toEqual(true);
		expect(buttonGroupComponent.hasClass(customClass)).toEqual(true);
	});
});
