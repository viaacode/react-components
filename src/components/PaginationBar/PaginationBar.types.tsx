import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';
import { PaginationProps } from '../Pagination';
import { PaginationProgressProps } from '../PaginationProgress';

export interface PaginationBarProps
	extends DefaultComponentProps,
		Pick<PaginationProps, 'onPageChange'>,
		Pick<PaginationProgressProps, 'start' | 'total'> {
	children?: ReactNode;
	count: number;
	showBackToTop?: boolean;
	nextLabel: string;
	nextIcon: ReactNode;
	previousLabel: string;
	previousIcon: ReactNode;
	backToTopLabel: string;
	backToTopIcon: ReactNode;
	labelBetweenPageStartAndEnd?: string;
	labelBetweenPageEndAndTotal?: string;
}
