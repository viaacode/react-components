import type { Meta, StoryObj } from '@storybook/react';

import { action } from 'storybook/actions';

import Tag from './Tag.js';

const meta: Meta<typeof Tag> = {
	title: 'Components/Tag',
	component: Tag,
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
	args: {
		label: 'Tag 1',
	},
};

export const CustomCloseButton: Story = {
	args: {
		label: 'Tag 1',
		closeButton: (
			<div
				role="button"
				tabIndex={0}
				onClick={action('Custom close button')}
				onKeyDown={() => null}
			>
				Close
			</div>
		),
	},
};
