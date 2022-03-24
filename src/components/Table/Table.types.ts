import { MouseEvent, ReactNode } from 'react';
import {
	CellPropGetter,
	ColumnInstance,
	HeaderGroup,
	HeaderProps,
	Row,
	SortingRule,
	TableCellProps,
	TableHeaderProps,
	TableOptions,
	TableRowProps,
	UsePaginationInstanceProps,
} from 'react-table';

import { DefaultComponentProps } from '../../types';

export type {
	Column,
	CellProps,
	Row,
	SortingRule,
	TableOptions,
	UsePaginationInstanceProps,
} from 'react-table';

export interface TableProps<T extends TableData> extends DefaultComponentProps {
	getCellProps?: (column: ColumnInstance<T>) => Partial<TableCellProps>;
	getColumnProps?: (column: HeaderGroup<T>) => Partial<TableHeaderProps>;
	getHeaderProps?: (column: HeaderGroup<T>) => Partial<TableHeaderProps>;
	getRowProps?: (row: Row<T>) => Partial<TableRowProps>;
	onRowClick?: (event: MouseEvent<HTMLTableRowElement>, row: Row<T>) => void;
	onSortChange?: (rules: SortingRule<T>[]) => void;
	options: TableOptions<T>;
	pagination?: (instance: UsePaginationInstanceProps<T>) => ReactNode;
	sortingIcons?: TableSortingIcons;
}

export type TableData = Record<string, any>;

export interface TableSortingIcons {
	asc?: ReactNode;
	default?: ReactNode;
	desc?: ReactNode;
}
