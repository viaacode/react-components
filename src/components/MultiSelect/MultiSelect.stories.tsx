import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import MultiSelect from './MultiSelect';

const meta: Meta<typeof MultiSelect> = {
	title: 'Components/MultiSelect',
	component: MultiSelect,
};
export default meta;
type Story = StoryObj<typeof MultiSelect>;

const MOCK_OPTIONS = [
	{
		id: 'type-1-id',
		label: 'type 1',
		checked: true,
	},
	{
		id: 'type-2-id',
		label: 'type 2',
		checked: false,
	},
	{
		id: 'type-3-id',
		label: 'type 3',
		checked: false,
	},
];

export const Default: Story = {
	args: {
		label: 'Dropdown label',
		options: MOCK_OPTIONS,
		onChange: action('On change'),
	},
};
