import React from 'react';

import { mount, shallow } from 'enzyme';

import { BlockVideo } from './BlockVideo';

const videoSource =
	'https://archief-media.viaa.be/viaa/TESTBEELD/ad87ac36b4f640dfb0fc57c26397b7aebb4c49785d2e4a7b8c8069aa95c4db16/browse.mp4';

export const blockVideoExampleExample = <BlockVideo videoSource={videoSource} />;

describe('<BlockVideo />', () => {
	it('Should be able to render', () => {
		shallow(blockVideoExampleExample);
	});

	it('Should render the video correctly', () => {
		const component = mount(blockVideoExampleExample);

		const videoElement = component.find('video');

		expect(videoElement.prop('src')).toEqual(videoSource);
	});

	it('Should set the correct className', () => {
		const component = mount(blockVideoExampleExample);

		const container = component.find('div').at(0);
		const videoWrapper = component.find('div').at(1);

		expect(container.hasClass('o-container-vertical')).toEqual(true);

		expect(videoWrapper.hasClass('c-video-wrapper')).toEqual(true);
		expect(videoWrapper.hasClass('c-video-wrapper--aspect-16-9')).toEqual(true);
	});
});
