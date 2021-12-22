import { storiesOf } from '@storybook/react';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';

import { MOCK_FLOW_PLAYER_PROPS_FULL } from '../../components/FlowPlayer/FlowPlayer.mock';

import { BlockVideoTitleTextButton } from './BlockVideoTitleTextButton';

const loremIpsumText = loremIpsum({ count: 14 });

storiesOf('v1/blocks/BlockVideoTitleTextButton', module)
	.addParameters({ jest: ['BlockVideoTitleTextButton'] })
	.add('BlockVideoTitleTextButton', () => (
		<BlockVideoTitleTextButton
			flowPlayerProps={MOCK_FLOW_PLAYER_PROPS_FULL}
			title="Title"
			titleLink="http://google.com?q=title"
			text={loremIpsumText}
		/>
	))
	.add('BlockVideoTitleTextButton no title', () => (
		<BlockVideoTitleTextButton
			flowPlayerProps={MOCK_FLOW_PLAYER_PROPS_FULL}
			text={loremIpsumText}
		/>
	))
	.add('BlockVideoTitleTextButton fully visible text', () => (
		<BlockVideoTitleTextButton
			flowPlayerProps={MOCK_FLOW_PLAYER_PROPS_FULL}
			title="Title"
			titleLink="http://google.com?q=title"
			text={loremIpsum({ count: 5 })}
		/>
	));
