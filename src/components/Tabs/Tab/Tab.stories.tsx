import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Tab from './Tab';

const meta: Meta<typeof Tab> = {
	title: 'Components/Tab',
	component: Tab,
};
export default meta;
type Story = StoryObj<typeof Tab>;

export const Default: Story = {
	args: {
		id: 'tab-id',
		label: 'Tab me!',
		active: false,
	},
};

export const WithCustomLabel: Story = {
	args: {
		id: 'tab-id',
		label: (
			<>
				<strong>Strong tag</strong>
				<small>small tag</small>
			</>
		),
		active: false,
	},
};
