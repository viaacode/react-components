import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Breadcrumbs from './Breadcrumbs';
import { MOCK_BREADCRUMBS } from './Breadcrumbs.mock';

const meta: Meta<typeof Breadcrumbs> = {
	title: 'Components/Breadcrumbs',
	component: Breadcrumbs,
};
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
	args: {
		icon: <span>-</span>,
		items: MOCK_BREADCRUMBS,
	},
};
