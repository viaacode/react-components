import { MouseEvent, ReactNode } from 'react';
import { Row, SortingRule, TableOptions, UsePaginationInstanceProps } from 'react-table';

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
