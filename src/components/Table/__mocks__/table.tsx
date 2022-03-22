import React from 'react';
import { CellProps, Column } from 'react-table';

export interface MockTableData {
	id: number;
	name: string;
	created_at: number;
	child: { id: number };
}

export const mockData: MockTableData[] = [1, 2, 3, 4, 5, 6].map((data) => {
	return {
		id: data,
		name: ['John', 'Jim', 'Bob', 'Susan', 'Sally', 'Delilah'][data - 1],
		created_at: new Date().setFullYear(new Date().getFullYear() - data),
		child: {
			id: 1000 + data,
		},
	};
});

export const mockColumns: Column<MockTableData>[] = [
	{
		Header: 'Id',
		accessor: 'id', // accessor is the "key" in the data
		disableSortBy: true,
	},
	{
		Header: 'Name',
		accessor: 'name',
	},
	{
		Header: 'Created at',
		accessor: 'created_at',
		Cell: ({ cell }: CellProps<MockTableData, MockTableData['created_at']>) => {
			return new Date(cell.value).toLocaleDateString();
		},
	},
	{
		id: 'Actions',
		Cell: <button>More</button>,
	},
];
