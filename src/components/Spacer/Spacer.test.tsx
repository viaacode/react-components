import { mount, shallow } from 'enzyme';
import React from 'react';

import { Spacer } from './Spacer';

describe('<Spacer />', () => {
	it('Should be able to render', () => {
		shallow(<Spacer />);
	});

	it('Should set the correct className', () => {
		const thumbnailComponent = shallow(<Spacer />);

		expect(thumbnailComponent.hasClass('u-spacer')).toEqual(true);
	});

	it('Should set the correct className when margin are passed', () => {
		const thumbnailComponent = shallow(<Spacer margin={['left-small']} />);

		expect(thumbnailComponent.hasClass('u-spacer-left-s')).toEqual(true);
	});

	it('Should set the correct className when margin are passed', () => {
		const thumbnailComponent = shallow(<Spacer margin={['left-small', 'top-large']} />);

		expect(thumbnailComponent.hasClass('u-spacer-left-s')).toEqual(true);
		expect(thumbnailComponent.hasClass('u-spacer-top-l')).toEqual(true);
	});

	it('Should correctly pass children', () => {
		const spacerComponent = mount(
			<Spacer margin={['left-small', 'top-large']}>
				<p>What a nice smile you have there!</p>
			</Spacer>
		);

		const content = spacerComponent.find('p');

		expect(content).toHaveLength(1);
	});
});
