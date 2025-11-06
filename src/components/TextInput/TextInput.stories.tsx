import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { TextInput } from './TextInput.js';

const meta: Meta<typeof TextInput> = {
	title: 'Components/TextInput',
	component: TextInput,
};
export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
	args: {},
};

export const TabOrder: Story = {
	render: (args) => (
		<>
			<TextInput {...args} />
			<TextInput {...args} />
		</>
	),
	args: {},
};
