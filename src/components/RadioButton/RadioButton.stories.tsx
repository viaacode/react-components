import type { Meta, StoryObj } from '@storybook/react';

import RadioButton from './RadioButton.js';

const meta: Meta<typeof RadioButton> = {
	title: 'Components/RadioButton',
	component: RadioButton,
};
export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
	args: {
		label: 'Check me!',
	},
};
