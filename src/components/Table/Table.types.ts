import { ReactNode } from 'react';
import { TableInstance, TableOptions } from 'react-table';

export interface TableProps<T extends object> {
	options: TableOptions<T>;
	sortingIcons?: TableSortingIcons;
	pagination?: (instance: TableInstance) => ReactNode;
}

export interface TableSortingIcons {
	default?: ReactNode;
	asc?: ReactNode;
	desc?: ReactNode;
}
