import { mount, shallow } from 'enzyme';
import React from 'react';

import { Spacer } from './Spacer';

describe('<Spacer />', () => {
	it('Should be able to render', () => {
		shallow(<Spacer />);
	});

	it('Should set the correct className', () => {
		const spacerComponent = shallow(<Spacer />);

		expect(spacerComponent.hasClass('u-spacer')).toEqual(true);
	});

	it('Should set the correct className when margin is passed (string)', () => {
		const spacerComponent = shallow(<Spacer margin="left-small" />);

		expect(spacerComponent.hasClass('u-spacer-left-s')).toEqual(true);
	});

	it('Should set the correct className when margin is passed (array)', () => {
		const spacerComponent = shallow(<Spacer margin={['left-small']} />);

		expect(spacerComponent.hasClass('u-spacer-left-s')).toEqual(true);
	});

	it('Should set the correct className when multiple margins are passed', () => {
		const spacerComponent = shallow(<Spacer margin={['left-small', 'top-large']} />);

		expect(spacerComponent.hasClass('u-spacer-left-s')).toEqual(true);
		expect(spacerComponent.hasClass('u-spacer-top-l')).toEqual(true);
	});

	it('Should correctly pass children', () => {
		const spacerComponent = mount(
			<Spacer>
				<p>What a nice smile you have there!</p>
			</Spacer>
		);

		const paragraph = spacerComponent.find('p');

		expect(spacerComponent.html()).toContain(paragraph.html());
	});
});
