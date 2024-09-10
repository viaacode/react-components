import React, { FC } from 'react';

import { PaginationProgressProps } from './PaginationProgress.types';

const PaginationProgress: FC<PaginationProgressProps> = ({
	start,
	end,
	total,
	labelBetweenPageStartAndEnd = '-',
	labelBetweenPageEndAndTotal = ' van',
}) => {
	const text = `${start}${labelBetweenPageStartAndEnd}${
		end > total ? total : end
	}${labelBetweenPageEndAndTotal}${total}`;

	return <span className="c-pagination-progress">{text}</span>;
};

export default PaginationProgress;
