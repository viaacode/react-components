import { DefaultComponentProps } from '../../types';

export interface PaginationProps extends DefaultComponentProps {
	pageCount: number;
	displayCount?: number;
	currentPage?: number;
	onPageChange?: (page: number) => void;
}
