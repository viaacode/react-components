import type { ReactNode } from 'react';

import type { DefaultComponentProps } from '../../types';

export interface PaginationProps extends DefaultComponentProps {
	children?: ReactNode;
	pageCount: number;
	displayCount?: number;
	currentPage?: number;
	onPageChange?: (page: number) => void;
	showFirstLastNumbers?: boolean;
	renderPreviousButton?: (onClick: () => void, disabled: boolean) => ReactNode | null;
	renderNextButton?: (onClick: () => void, disabled: boolean) => ReactNode | null;
	renderFirstButton?: (onClick: () => void, disabled: boolean) => ReactNode | null;
	renderLastButton?: (onClick: () => void, disabled: boolean) => ReactNode | null;
}
