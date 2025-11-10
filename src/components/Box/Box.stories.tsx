import type { Meta, StoryObj } from '@storybook/react';
import { loremIpsum } from 'lorem-ipsum';

import Box from './Box.js';

const content = loremIpsum({ count: 10 });

const meta: Meta<typeof Box> = {
	title: 'Components/Box',
	component: Box,
};
export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
	render: (args) => <Box {...args}>{content}</Box>,
	args: {},
};
