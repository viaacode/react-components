import type { Meta, StoryObj } from '@storybook/react-vite';

import Badge from './Badge';

const meta: Meta<typeof Badge> = {
	title: 'Components/Badge',
	component: Badge,
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
	args: {
		text: 'Pending approval',
	},
};

export const SuccessBadge: Story = {
	args: {
		text: 'Approval granted',
		type: 'success',
	},
};

export const ErrorBadge: Story = {
	args: {
		text: 'Approval denied',
		type: 'error',
	},
};
