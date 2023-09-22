import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface PaginationProps extends DefaultComponentProps {
	children?: React.ReactNode;
	pageCount: number;
	displayCount?: number;
	currentPage?: number;
	onPageChange?: (page: number) => void;
	showFirstLastButtons?: boolean;
	showFirstLastNumbers?: boolean;
	buttons?: PaginationButtons;
}

export interface PaginationButtons {
	previous?: ReactNode;
	next?: ReactNode;
	first?: ReactNode;
	last?: ReactNode;
}
