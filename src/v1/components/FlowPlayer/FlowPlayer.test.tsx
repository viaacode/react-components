import { shallow } from 'enzyme';
import React from 'react';

import { FlowPlayer } from './FlowPlayer';
import { MOCK_FLOW_PLAYER_PROPS_FULL } from './FlowPlayer.mock';

const customClass = 'c-video-player-custom';

describe('<FlowPlayer />', () => {
	it('Should be able to render', () => {
		shallow(<FlowPlayer {...MOCK_FLOW_PLAYER_PROPS_FULL} />);
	});

	it('Should set the correct className', () => {
		const FlowPlayerComponent = shallow(
			<FlowPlayer className={customClass} {...MOCK_FLOW_PLAYER_PROPS_FULL} />
		);

		expect(FlowPlayerComponent.hasClass(customClass)).toEqual(true);
		expect(FlowPlayerComponent.hasClass('c-video-player')).toEqual(true);
	});
});
