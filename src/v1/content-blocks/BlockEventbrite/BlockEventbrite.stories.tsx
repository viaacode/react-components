import { storiesOf } from '@storybook/react';
import React from 'react';

import { BlockEventbrite } from './BlockEventbrite';

storiesOf('v1/blocks/BlockEventbrite', module)
	.addParameters({ jest: ['BlockEventbrite'] })
	.add('BlockEventbrite', () => <BlockEventbrite eventId="105636373236" label="Register" />)
	.add('BlockEventbrite left', () => (
		<BlockEventbrite eventId="105636373236" label="Register" align="left" />
	))
	.add('BlockEventbrite center', () => (
		<BlockEventbrite eventId="105636373236" label="Register" align="center" />
	))
	.add('BlockEventbrite right', () => (
		<BlockEventbrite eventId="105636373236" label="Register" align="right" />
	))
	.add('BlockEventbrite custom button', () => (
		<BlockEventbrite eventId="105636373236" label="Register" icon="tag" type="pupil-primary" />
	));
