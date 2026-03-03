import type { ReactNode } from 'react';

import type { DefaultComponentProps } from '../../types';
import type { PaginationProps } from '../Pagination';
import type { PaginationProgressProps } from '../PaginationProgress';

export interface PaginationBarProps
	extends DefaultComponentProps,
		Pick<PaginationProps, 'displayCount' | 'onPageChange'>,
		Pick<PaginationProgressProps, 'startItem' | 'totalItems'> {
	onScrollToTop?: () => void;
	children?: ReactNode;
	itemsPerPage: number;
	// The amount of total items we want to display in the pagination. Calculations will still be done based on totalItems
	// The search for example only can get max 10.000 items but the total can be well over that limit
	// https://meemoo.atlassian.net/browse/AVO-3409
	visualTotalItems?: number;
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
