import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';
import { PaginationProps } from '../Pagination';
import { PaginationProgressProps } from '../PaginationProgress';

export interface PaginationBarProps
	extends DefaultComponentProps,
		Pick<PaginationProps, 'displayCount' | 'onPageChange'>,
		Pick<PaginationProgressProps, 'startItem' | 'totalItems'> {
	onScrollToTop?: () => void;
	children?: ReactNode;
	itemsPerPage: number;
	showBackToTop?: boolean;
	showProgress?: boolean;
	showFirstAndLastButtons?: boolean;
	showButtonLabels?: boolean;
	nextLabel: string;
	nextIcon: ReactNode;
	previousLabel: string;
	previousIcon: ReactNode;
	firstLabel: string;
	firstIcon: ReactNode;
	lastLabel: string;
	lastIcon: ReactNode;
	backToTopLabel: string;
	backToTopIcon: ReactNode;
	labelBetweenPageStartAndEnd?: string;
	labelBetweenPageEndAndTotal?: string;
}
