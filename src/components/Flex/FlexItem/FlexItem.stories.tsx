import type { Meta, StoryObj } from '@storybook/react-vite';

import { FlexItem } from './FlexItem.js';

const meta: Meta<typeof FlexItem> = {
	title: 'Components/FlexItem',
	component: FlexItem,
};
export default meta;
type Story = StoryObj<typeof FlexItem>;

export const Basic: Story = {
	args: {},
	render: (args) => <FlexItem {...args}>Flex Item</FlexItem>,
};

export const Shrink: Story = {
	args: {
		shrink: true,
	},
	render: (args) => <FlexItem {...args}>Flex Item</FlexItem>,
};
