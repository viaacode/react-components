import { storiesOf } from '@storybook/react';
import React from 'react';

import { Button } from '../..';

import { ButtonGroup } from './ButtonGroup';

storiesOf('v1/components/ButtonGroup', module)
	.addParameters({ jest: ['ButtonGroup'] })
	.add('ButtonGroup 5 buttons', () => (
		<ButtonGroup>
			<Button type="secondary" label="Test Button One" />
			<Button type="secondary" label="Test Button Two" />
			<Button type="secondary" label="Test Button Three" />
			<Button type="secondary" label="Test Button Four" />
			<Button type="secondary" label="Test Button Five" />
		</ButtonGroup>
	))
	.add('ButtonGroup 2 buttons', () => (
		<ButtonGroup>
			<Button type="secondary" label="Test Button One" />
			<Button type="secondary" label="Test Button Two" />
		</ButtonGroup>
	))
	.add('ButtonGroup 1 buttons', () => (
		<ButtonGroup>
			<Button type="secondary" label="Test Button One" />
		</ButtonGroup>
	));
