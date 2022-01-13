import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Table from './Table';
import { defaultSortingIcons } from './Table.const';
import { mockColumns, mockData } from './__mocks__/table';

export default {
	title: 'Components/Table',
	component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
	options: {
		columns: mockColumns,
		data: mockData,
	},
	sortingIcons: {
		...defaultSortingIcons,
		default: '🔀',
	},
};
