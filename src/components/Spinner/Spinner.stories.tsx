import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Spinner from './Spinner';

export default {
	title: 'Components/Spinner',
	component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => (
	<div style={{ width: '30px' }}>
		<Spinner {...args} />
	</div>
);

const TemplateLarge: ComponentStory<typeof Spinner> = (args) => (
	<div style={{ width: '300px' }}>
		<Spinner {...args} />
	</div>
);

export const Default = Template.bind({});
Default.args = {};

export const Large = TemplateLarge.bind({});
Large.args = {};
