import type { FC } from 'react';

import { numberWithCommas } from '../../utils/numbers-with-commas.js';
import type { PaginationProgressProps } from './PaginationProgress.types.js';

const PaginationProgress: FC<PaginationProgressProps> = ({
	startItem,
	endItem,
	totalItems,
	labelBetweenPageStartAndEnd = '-',
	labelBetweenPageEndAndTotal = ' van ',
}) => {
	const text = `${numberWithCommas(startItem)}${labelBetweenPageStartAndEnd}${numberWithCommas(
		endItem > totalItems ? totalItems : endItem
	)}${labelBetweenPageEndAndTotal}${numberWithCommas(totalItems)}`;

	return <span className="c-pagination-progress">{text}</span>;
};

export default PaginationProgress;
