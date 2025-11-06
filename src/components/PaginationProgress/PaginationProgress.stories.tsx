import type { Meta, StoryObj } from '@storybook/react';

import PaginationProgress from './PaginationProgress.js';

const meta: Meta<typeof PaginationProgress> = {
	title: 'Components/PaginationProgress',
	component: PaginationProgress,
};
export default meta;
type Story = StoryObj<typeof PaginationProgress>;

export const Default: Story = {
	args: {
		startItem: 1,
		endItem: 9,
		totalItems: 20,
	},
};

export const ThousandsSeparator: Story = {
	args: {
		startItem: 123,
		endItem: 15080,
		totalItems: 100000000,
	},
};
