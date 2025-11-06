import type { Meta, StoryObj } from '@storybook/react';
import type { Column } from 'react-table';
import { action } from 'storybook/actions';

import { defaultSortingIcons } from './Table.const.js';
import Table from './Table.js';
import type { TableData } from './Table.types.js';
import { mockColumns, mockData } from './__mocks__/table.js';

const meta: Meta<typeof Table> = {
	title: 'Components/Table',
	component: Table,
};
export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
	args: {
		options: {
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
	},
};
