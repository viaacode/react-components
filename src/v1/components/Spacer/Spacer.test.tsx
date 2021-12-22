import { mount, shallow } from 'enzyme';
import React from 'react';

import { Spacer, SpacerOptionSchema } from './Spacer';

describe('<Spacer />', () => {
	it('Should be able to render', () => {
		shallow(<Spacer />);
	});

	it('Should set the correct className', () => {
		const cumstomClass = 'c-spacer-custom';

		const spacerComponent = shallow(<Spacer className={cumstomClass} />);

		expect(spacerComponent.hasClass(cumstomClass)).toBeTruthy();
		expect(spacerComponent.hasClass('u-spacer')).toBeTruthy();
	});

	it('Should set the correct className when margin/padding is passed (string)', () => {
		const spacerComponent = shallow(<Spacer margin="left-small" padding="left-small" />);

		expect(spacerComponent.hasClass('u-spacer-left-s')).toBeTruthy();
		expect(spacerComponent.hasClass('u-padding-left-s')).toBeTruthy();
	});

	it('Should set no padding/margin when none is passed', () => {
		const spacerComponent = shallow(<Spacer margin="none" padding="none" />);

		expect(spacerComponent.prop('className')).toBe('');
	});

	it('Should set the correct className when margin/padding is passed (array)', () => {
		const spacerComponent = shallow(
			<Spacer margin={['left-small']} padding={['left-small']} />
		);

		expect(spacerComponent.hasClass('u-spacer-left-s')).toBeTruthy();
		expect(spacerComponent.hasClass('u-padding-left-s')).toBeTruthy();
	});

	it('Should set the correct className when multiple margins/paddings are passed', () => {
		const spacers: SpacerOptionSchema[] = ['left-small', 'top-large', 'right-extra-large'];
		const spacerComponent = shallow(<Spacer margin={spacers} padding={spacers} />);

		expect(spacerComponent.hasClass('u-spacer-left-s')).toBeTruthy();
		expect(spacerComponent.hasClass('u-spacer-top-l')).toBeTruthy();
		expect(spacerComponent.hasClass('u-spacer-right-xl')).toBeTruthy();

		expect(spacerComponent.hasClass('u-padding-left-s')).toBeTruthy();
		expect(spacerComponent.hasClass('u-padding-top-l')).toBeTruthy();
		expect(spacerComponent.hasClass('u-padding-right-xl')).toBeTruthy();
	});

	it('Should correctly pass children', () => {
		const spacerComponent = mount(
			<Spacer margin="large">
				<p>What a nice smile you have there!</p>
			</Spacer>
		);

		const paragraph = spacerComponent.find('p');

		expect(spacerComponent.html()).toContain(paragraph.html());
	});
});
