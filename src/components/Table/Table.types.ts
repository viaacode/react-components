import { MouseEvent, ReactNode } from 'react';
import { SortingRule, TableOptions, UsePaginationInstanceProps } from 'react-table';

import { DefaultComponentProps } from '../../types';

export interface TableProps<T extends object> extends DefaultComponentProps {
	onRowClick?: (event: MouseEvent<HTMLTableRowElement>, row: T) => void;
	onSortChange?: (rules: SortingRule<T>[]) => void;
	options: TableOptions<T>;
	pagination?: (instance: UsePaginationInstanceProps<T>) => ReactNode;
	sortingIcons?: TableSortingIcons;
}

export interface TableSortingIcons {
	asc?: ReactNode;
	default?: ReactNode;
	desc?: ReactNode;
}
