import type { AvoSearchOrderDirection } from '@viaa/avo2-types';
import type { MouseEvent, ReactNode } from 'react';
import type {
	ColumnInstance,
	HeaderGroup,
	Row,
	TableCellProps,
	TableHeaderProps,
	TableOptions,
	TableRowProps,
	UsePaginationInstanceProps,
} from 'react-table';
import type { DefaultComponentProps } from '../../types';

export type {
	CellProps,
	Column,
	Row,
	SortingRule,
	TableOptions,
	UsePaginationInstanceProps,
} from 'react-table';

export interface TableProps<T extends TableData> extends DefaultComponentProps {
	children?: React.ReactNode;
	getCellProps?: (column: ColumnInstance<T>) => Partial<TableCellProps>;
	getColumnProps?: (
		column: HeaderGroup<T> | ColumnInstance<T>
	) => Partial<TableHeaderProps> | Partial<TableCellProps>;
	getHeaderProps?: (column: HeaderGroup<T>) => Partial<TableHeaderProps>;
	getRowProps?: (row: Row<T>) => Partial<TableRowProps>;
	onRowClick?: (event: MouseEvent<HTMLTableRowElement>, row: Row<T>) => void;
	onSortChange?: (
		sortProp: string | undefined,
		sortDirection: AvoSearchOrderDirection | undefined
	) => void;
	options: TableOptions<T>;
	pagination?: (instance: UsePaginationInstanceProps<T>) => ReactNode;
	sortingIcons?: TableSortingIcons;
	/**
	 * We need the possibility to hide the table itself but keep the useTable logic itself in order to maintain the focused row
	 */
	showTable?: boolean;
	enableRowFocusOnClick?: boolean;
}

export type TableData = Record<'id', string> & Record<string, any>;

export interface TableSortingIcons {
	asc?: ReactNode;
	default?: ReactNode;
	desc?: ReactNode;
}
