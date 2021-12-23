import { mount, shallow } from 'enzyme';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';

import { BlockTitleImageText } from './BlockTitleImageText';

const customClass = 'c-block-custom';
const imageSource = '/images/500x200.svg';
const loremIpsumText = loremIpsum({ count: 10 });

export const blockTitleImageTextExample = (
	<BlockTitleImageText
		className={customClass}
		imageSource={imageSource}
		imageDescription="image showing the default dimensions on a grey background"
		title="Title"
		text={loremIpsumText}
	/>
);

describe('<BlockTitleImageText />', () => {
	it('Should be able to render', () => {
		shallow(blockTitleImageTextExample);
	});

	it('Should render the thumbnail slot correctly', () => {
		const component = mount(blockTitleImageTextExample);

		const imgElement = component.find('img');

		expect(imgElement.prop('src')).toEqual(imageSource);
	});

	it('Should render the text slot correctly', () => {
		const component = mount(blockTitleImageTextExample);

		const h2Element = component.find('h2');

		expect(h2Element.html()).toContain(`>Title<`);
	});

	it('Should set the correct className', () => {
		const component = mount(blockTitleImageTextExample);

		const spacerElement = component.find('div').at(0);
		const containerElement = component.find('div').at(1);

		expect(component.hasClass(customClass)).toEqual(true);
		expect(spacerElement.hasClass('u-spacer-top-l')).toEqual(true);
		expect(containerElement.hasClass('o-container--small')).toEqual(true);
	});
});
