import { shallow } from 'enzyme';
import React from 'react';

import { AspectRatioWrapper, AspectRatioWrapperPropsSchema } from './AspectRatioWrapper';

const aspectRatioWrapper = (props: AspectRatioWrapperPropsSchema = {}) => (
	<AspectRatioWrapper {...props}>
		{/* eslint-disable-next-line jsx-a11y/media-has-caption */}
		<video
			src="https://archief-media.viaa.be/viaa/TESTBEELD/c44b877a9a7d4b1a99c5b8b676c3aef4ca370f2fe15d42d49b438e71eea6b99d/browse.mp4"
			controls
		/>
	</AspectRatioWrapper>
);

describe('<AspectRatioWrapper>', () => {
	it('should be able to render', () => {
		shallow(aspectRatioWrapper());
	});

	it('should set the correct className', () => {
		const component = shallow(aspectRatioWrapper());

		expect(component.hasClass('c-aspect-ratio-wrapper')).toBeTruthy();
	});

	it('should set the correct className for the aspect ratio', () => {
		const component32 = shallow(aspectRatioWrapper({ aspect: '3:2' }));
		const component169 = shallow(aspectRatioWrapper({ aspect: '16:9' }));

		expect(component32.hasClass('c-aspect-ratio-wrapper--aspect-3-2')).toBeTruthy();
		expect(component169.hasClass('c-aspect-ratio-wrapper--aspect-16-9')).toBeTruthy();
	});
});
