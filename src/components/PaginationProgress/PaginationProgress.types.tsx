import { ReactNode } from 'react';

export interface PaginationProgressProps {
	children?: ReactNode;
	start: number;
	end: number;
	total: number;
	labelBetweenPageStartAndEnd?: string;
	labelBetweenPageEndAndTotal?: string;
}
