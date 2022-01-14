import { ReactNode } from 'react';
import { SortingRule, TableOptions, UsePaginationInstanceProps } from 'react-table';

import { DefaultComponentProps } from '../../types';

export interface TableProps<T extends object> extends DefaultComponentProps {
	options: TableOptions<T>;
	sortingIcons?: TableSortingIcons;
	pagination?: (instance: UsePaginationInstanceProps<T>) => ReactNode;
	onSortChange?: (rules: SortingRule<T>[]) => void;
}

export interface TableSortingIcons {
	default?: ReactNode;
	asc?: ReactNode;
	desc?: ReactNode;
}
