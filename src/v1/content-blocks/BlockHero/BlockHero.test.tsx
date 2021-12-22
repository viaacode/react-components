import { mount, shallow } from 'enzyme';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';

import { BlockHero } from './BlockHero';

const customClass = 'c-block-custom';
const title = 'Page title';
const text = loremIpsum({ count: 3 });

export const BlockHeroExample = (
	<BlockHero
		className={customClass}
		title={title}
		content={text}
		src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'}
		altText={'hero video'}
	/>
);

describe('<BlockHero />', () => {
	it('Should be able to render', () => {
		shallow(BlockHeroExample);
	});

	it('Should set the correct className', () => {
		const component = mount(BlockHeroExample);
		expect(component.hasClass(customClass)).toEqual(true);
	});
});
