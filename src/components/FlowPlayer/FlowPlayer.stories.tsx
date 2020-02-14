import React from 'react';

import { storiesOf } from '@storybook/react';

import { action } from '../../helpers';

import { FlowPlayer } from './FlowPlayer';
import { MOCK_FLOW_PLAYER_PROPS_FULL } from './FlowPlayer.mock';

storiesOf('components/FlowPlayer', module)
	.addParameters({ jest: ['FlowPlayer'] })
	.add('FlowPlayer Video', () => (
		<div className="o-grid-col-bp3-4">
			<FlowPlayer {...MOCK_FLOW_PLAYER_PROPS_FULL} />
		</div>
	))
	.add('FlowPlayer Thumbnail', () => (
		<div className="o-grid-col-bp3-4">
			<FlowPlayer {...MOCK_FLOW_PLAYER_PROPS_FULL} src={null} />
		</div>
	))
	.add('FlowPlayer Thumbnail met Geknipt', () => (
		<div className="o-grid-col-bp3-4">
			<FlowPlayer {...MOCK_FLOW_PLAYER_PROPS_FULL} src={null} start={10} end={100} />
		</div>
	))
	.add('FlowPlayer events', () => (
		<div className="o-grid-col-bp3-4">
			<FlowPlayer
				{...MOCK_FLOW_PLAYER_PROPS_FULL}
				onPlay={action('play')}
				onPause={action('pause')}
				onEnded={action('ended')}
				onTimeUpdate={action('timeupdate')}
			/>
		</div>
	));
