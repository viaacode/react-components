import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Spinner from './Spinner';

const meta: Meta<typeof Spinner> = {
	title: 'Components/Spinner',
	component: Spinner,
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
	render: (args) => (
		<div style={{ width: '30px' }}>
			<Spinner {...args} />
		</div>
	),
	args: {},
};

export const Large: Story = {
	render: (args) => (
		<div style={{ width: '300px' }}>
			<Spinner {...args} />
		</div>
	),
	args: {},
};
