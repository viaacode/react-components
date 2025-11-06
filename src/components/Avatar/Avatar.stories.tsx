import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Avatar from './Avatar.js';

const meta: Meta<typeof Avatar> = {
	title: 'Components/Avatar',
	component: Avatar,
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
	args: {
		children: <div style={{ background: 'hotpink', padding: '0.5em' }}>🚀</div>,
		text: 'Studio Hyperdrive',
	},
};

export const Large: Story = {
	args: {
		children: <div style={{ background: 'hotpink', padding: '0.5em' }}>🚀</div>,
		text: 'Studio Hyperdrive',
	},
	render: (args) => (
		<div style={{ width: '100px', border: '1px solid red' }}>
			<Avatar {...args} />
		</div>
	),
};
