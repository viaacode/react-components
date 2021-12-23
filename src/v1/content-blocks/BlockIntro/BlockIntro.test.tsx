import { mount, shallow } from 'enzyme';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';

import { BlockIntro } from './BlockIntro';

const customClass = 'c-block-custom';
const title = 'Page title';
const text = loremIpsum({ count: 3 });

export const BlockIntroExample = (
	<BlockIntro className={customClass} title={title} content={text} />
);

describe('<BlockIntro />', () => {
	it('Should be able to render', () => {
		shallow(BlockIntroExample);
	});

	it('Should set the correct className', () => {
		const component = mount(BlockIntroExample);

		const verticalContainer = component.find('div').at(0);

		expect(component.hasClass(customClass)).toEqual(true);
		expect(verticalContainer.hasClass('o-container-vertical')).toEqual(true);
		expect(verticalContainer.hasClass('o-container-vertical-page-intro')).toEqual(true);
	});
});
