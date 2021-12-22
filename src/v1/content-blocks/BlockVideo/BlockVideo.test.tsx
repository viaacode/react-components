import { mount, shallow } from 'enzyme';
import React from 'react';

import { MOCK_FLOW_PLAYER_PROPS_FULL } from '../../components/FlowPlayer/FlowPlayer.mock';

import { BlockVideo } from './BlockVideo';

const customClass = 'c-block-custom';

export const blockVideoExampleExample = (
	<BlockVideo className={customClass} flowPlayerProps={MOCK_FLOW_PLAYER_PROPS_FULL} />
);

describe('<BlockVideo />', () => {
	it('Should be able to render', () => {
		shallow(blockVideoExampleExample);
	});

	it('Should set the correct className', () => {
		const component = mount(blockVideoExampleExample);

		const container = component.find('div').at(0);
		const aspectRatioWrapper = component.find('div').at(1);

		expect(container.hasClass(customClass)).toEqual(true);
		expect(container.hasClass('o-container-vertical')).toEqual(true);

		expect(aspectRatioWrapper.hasClass('c-aspect-ratio-wrapper')).toEqual(true);
		expect(aspectRatioWrapper.hasClass('c-aspect-ratio-wrapper--aspect-16-9')).toEqual(true);
	});
});
