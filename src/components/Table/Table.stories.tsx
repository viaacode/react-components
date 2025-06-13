import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import type { Column } from 'react-table';

import Table from './Table';
import { defaultSortingIcons } from './Table.const';
import type { TableData } from './Table.types';
import { mockColumns, mockData } from './__mocks__/table';

export default {
	title: 'Components/Table',
	component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
	options: {
		// .bind() doesn't play well with generics so we have to cast our value
		columns: mockColumns as Column<TableData>[],
		data: mockData,
	},
	sortingIcons: {
		...defaultSortingIcons,
		default: '🔀',
	},
	onSortChange: (rules) => {
		action('onOpen')(rules);
	},
};
