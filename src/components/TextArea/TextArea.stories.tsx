import type { Meta, StoryObj } from '@storybook/react';

import TextArea from './TextArea';

const meta: Meta<typeof TextArea> = {
	title: 'Components/TextArea',
	component: TextArea,
};
export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
	args: {},
};
