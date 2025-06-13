import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import MultiSelect from './MultiSelect';

export default {
	title: 'Components/MultiSelect',
	component: MultiSelect,
} as ComponentMeta<typeof MultiSelect>;

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

const Template: ComponentStory<typeof MultiSelect> = (args) => <MultiSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: 'Dropdown label',
	options: MOCK_OPTIONS,
	onChange: action('On change'),
};
