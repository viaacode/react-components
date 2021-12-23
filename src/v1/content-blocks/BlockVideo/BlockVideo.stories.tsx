import { storiesOf } from '@storybook/react';
import React from 'react';

import { MOCK_FLOW_PLAYER_PROPS_FULL } from '../../components/FlowPlayer/FlowPlayer.mock';

import { BlockVideo } from './BlockVideo';

storiesOf('v1/blocks/BlockVideo', module)
	.addParameters({ jest: ['BlockVideo'] })
	.add('BlockVideo', () => <BlockVideo flowPlayerProps={MOCK_FLOW_PLAYER_PROPS_FULL} />);
