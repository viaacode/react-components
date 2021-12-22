import { shallow } from 'enzyme';
import React from 'react';

import { Button } from '../..';

import { ButtonToolbar } from './ButtonToolbar';

describe('<ButtonToolbar />', () => {
	it('Should be able to render', () => {
		shallow(
			<ButtonToolbar>
				<Button label="test1" />
				<Button label="test2" />
			</ButtonToolbar>
		);
	});

	it('Should set the correct className', () => {
		const customClass = 'c-button-toolbar-custom';
		const ButtonToolbarComponent = shallow(
			<ButtonToolbar className={customClass}>
				<Button label="test1" />
				<Button label="test2" />
			</ButtonToolbar>
		);

		expect(ButtonToolbarComponent.hasClass('c-button-toolbar')).toEqual(true);
		expect(ButtonToolbarComponent.hasClass(customClass)).toEqual(true);
	});
});
