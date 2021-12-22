import { mount, shallow } from 'enzyme';
import React from 'react';

import { BlockImage } from './BlockImage';

const customClass = 'c-block-custom';
const imageSource = '/images/500x200.svg';

const blockImageExample = (
	<BlockImage
		className={customClass}
		imageSource={imageSource}
		imageDescription="image showing the default dimensions on a grey background"
		title="example title"
		text="example text"
		width="400px"
	/>
);

describe('<BlockImage />', () => {
	it('Should be able to render', () => {
		shallow(blockImageExample);
	});

	it('Should render the image correctly', () => {
		const component = mount(blockImageExample);

		const imgElement = component.find('img');

		expect(imgElement.prop('src')).toEqual(imageSource);
	});

	it('Should set the correct className', () => {
		const component = mount(blockImageExample);

		const imgWrapperElement = component.find('div').at(1);

		expect(component.hasClass(customClass)).toEqual(true);
		expect(imgWrapperElement.hasClass('c-image--full')).toEqual(true);
	});

	it('Should set the correct width', () => {
		const component = mount(blockImageExample);

		const verticalContainerElement = component.find('div').at(0);

		expect(verticalContainerElement.hasClass('o-block-image__400px')).toEqual(true);
	});

	it('Should set the correct title and text', () => {
		const component = mount(blockImageExample);

		const titleElement = component.find('h3').at(0);
		const textElement = component.find('p').at(0);

		expect(titleElement.text()).toEqual('© example title');
		expect(textElement.text()).toEqual('example text');
	});
});
