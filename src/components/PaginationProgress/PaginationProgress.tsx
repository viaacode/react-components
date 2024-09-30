import React, { FC } from 'react';

import { PaginationProgressProps } from './PaginationProgress.types';

const PaginationProgress: FC<PaginationProgressProps> = ({
	startItem,
	endItem,
	totalItems,
	labelBetweenPageStartAndEnd = '-',
	labelBetweenPageEndAndTotal = ' van ',
}) => {
	const text = `${startItem}${labelBetweenPageStartAndEnd}${
		endItem > totalItems ? totalItems : endItem
	}${labelBetweenPageEndAndTotal}${totalItems}`;

	return <span className="c-pagination-progress">{text}</span>;
};

export default PaginationProgress;
