import type {
	Cell,
	Column,
	ColumnDef,
	Header,
	Row,
	Table as TanStackTableInstance,
} from '@tanstack/react-table';
import type { AvoSearchOrderDirection } from '@viaa/avo2-types';
import type { MouseEvent, ReactNode } from 'react';
import type { DefaultComponentProps } from '../../types';

export type {
	CellContext as CellProps,
	ColumnDef as Column,
	ColumnSort as SortingRule,
	Row,
	Table as UsePaginationInstanceProps,
} from '@tanstack/react-table';

export interface TableOptions<T extends TableData> {
	columns: ColumnDef<T>[];
	data: T[];
}

export interface TableProps<T extends TableData> extends DefaultComponentProps {
	children?: React.ReactNode;
	getCellProps?: (cell: Cell<T, unknown>) => React.HTMLAttributes<HTMLTableCellElement>;
	getColumnProps?: (column: Column<T, unknown>) => React.HTMLAttributes<HTMLElement>;
	getHeaderProps?: (header: Header<T, unknown>) => React.HTMLAttributes<HTMLTableCellElement>;
	getRowProps?: (row: Row<T>) => React.HTMLAttributes<HTMLTableRowElement>;
	onRowClick?: (event: MouseEvent<HTMLTableRowElement>, row: Row<T>) => void;
	onSortChange?: (
		sortProp: string | undefined,
		sortDirection: AvoSearchOrderDirection | undefined
	) => void;
	options: TableOptions<T>;
	pagination?: (table: TanStackTableInstance<T>) => ReactNode;
	sortingIcons?: TableSortingIcons;
	/**
	 * We need the possibility to hide the table itself but keep the useTable logic itself in order to maintain the focused row
	 */
	showTable?: boolean;
	enableRowFocusOnClick?: boolean;
}

export type TableData = Record<'id', string | number> & Record<string, any>;

export interface TableSortingIcons {
	asc?: ReactNode;
	default?: ReactNode;
	desc?: ReactNode;
}
