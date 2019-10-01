import { mount, shallow } from 'enzyme';
import React from 'react';

import { BlockSubtitle } from './BlockSubtitle';

const customClass = 'c-block-custom';
const subtitle = 'Subtitle';

export const blockSubtitleExample = <BlockSubtitle className={customClass} subtitle={subtitle} />;

describe('<BlockSubtitle />', () => {
	it('Should be able to render', () => {
		shallow(blockSubtitleExample);
	});

	it('Should render the title correctly', () => {
		const component = shallow(blockSubtitleExample);

		const h2Element = component.find('h2');

		expect(h2Element.html()).toContain(`>${subtitle}<`);
	});

	it('Should set the correct className', () => {
		const component = mount(blockSubtitleExample);

		const verticalContainer = component.find('div').at(0);
		const h2Element = component.find('h2').at(0);

		expect(verticalContainer.hasClass(customClass)).toEqual(true);
		expect(verticalContainer.hasClass('o-container-vertical')).toEqual(true);
		expect(verticalContainer.hasClass('o-container-vertical-subtitle')).toEqual(true);

		expect(h2Element.hasClass('o-container-vertical-subtitle__title')).toEqual(true);
	});
});
