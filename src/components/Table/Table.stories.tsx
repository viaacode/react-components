import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Column } from 'react-table';
import { action } from 'storybook/actions';
import { mockColumns, mockData } from './__mocks__/table';
import Table from './Table';
import { defaultSortingIcons } from './Table.const';
import type { TableData } from './Table.types';

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
