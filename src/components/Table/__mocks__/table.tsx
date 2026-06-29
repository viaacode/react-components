import type { CellContext, ColumnDef } from '@tanstack/react-table';

export interface MockTableData {
	id: string;
	name: string;
	created_at: number;
	child: { id: number };
}

export const mockData: MockTableData[] = [1, 2, 3, 4, 5, 6].map((data) => {
	return {
		id: data.toString(),
		name: ['John', 'Jim', 'Bob', 'Susan', 'Sally', 'Delilah'][data - 1],
		created_at: new Date().setFullYear(new Date().getFullYear() - data),
		child: {
			id: 1000 + data,
		},
	};
});

export const mockColumns: ColumnDef<MockTableData>[] = [
	{
		header: 'Id',
		accessorKey: 'id',
		enableSorting: false,
	},
	{
		header: 'Name',
		accessorKey: 'name',
	},
	{
		header: 'Created at',
		accessorKey: 'created_at',
		cell: ({ cell }: CellContext<MockTableData, MockTableData['created_at']>) => {
			return new Date(cell.getValue()).toLocaleDateString();
		},
	},
	{
		id: 'actions',
		cell: () => <button type="button">More</button>,
	},
];
