import type { Meta, StoryObj } from '@storybook/react';

import Tabs from './Tabs.js';
import { MOCK_TABS } from './__mocks__/tabs.js';

const meta: Meta<typeof Tabs> = {
	title: 'Components/Tabs',
	component: Tabs,
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
	args: {
		tabs: MOCK_TABS,
	},
};
