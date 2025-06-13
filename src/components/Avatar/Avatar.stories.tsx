import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Avatar from './Avatar';

export default {
	title: 'Components/Avatar',
	component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

const TemplateLarge: ComponentStory<typeof Avatar> = (args) => (
	<div style={{ width: '100px', border: '1px solid red' }}>
		<Avatar {...args} />
	</div>
);

export const Default = Template.bind({});
Default.args = {
	children: <div style={{ background: 'hotpink', padding: '0.5em' }}>🚀</div>,
	text: 'Studio Hyperdrive',
};

export const Large = TemplateLarge.bind({});
Large.args = {
	children: <div style={{ background: 'hotpink', padding: '0.5em' }}>🚀</div>,
	text: 'Studio Hyperdrive',
};
