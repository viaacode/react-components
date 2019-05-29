import React, { FunctionComponent, useState } from 'react';

import classNames from 'classnames';

import { Icon } from '../Icon/Icon';

export interface PaginationProps {
	pageCount: number;
	displayCount?: number;
	initialPage?: number;
	onPageChange?: (page: number) => void;
}

export interface PaginationState {
	currentPage: number;
}

export const Pagination: FunctionComponent<PaginationProps> = ({
	pageCount,
	displayCount = 5,
	initialPage = 0,
	onPageChange = () => {},
}: PaginationProps) => {
	const [currentPage, setCurrentPage] = useState(initialPage);

	function changePage(page: number) {
		if (page >= 0 && page <= pageCount - 1 && page !== currentPage) {
			setCurrentPage(page);
			onPageChange(page);
			console.log(page);
		}
	}

	function generatePages() {
		// generate first x pages if currentPage is less than the displaycount
		if (currentPage < displayCount / 2) {
			return Array.from({ length: displayCount }, (value: number, index: number) => index);
		}

		// generate last x pages if currentPage is less than the pageCount - displayCount
		if (currentPage > pageCount - displayCount / 2) {
			return Array.from(
				{ length: displayCount },
				(value: number, index: number) => pageCount - (displayCount - index)
			);
		}

		// generate x pages padding the current page
		return Array.from(
			{ length: displayCount },
			(value: number, index: number) => index + currentPage - Math.floor(displayCount / 2)
		);
	}

	const pagesToDisplay = generatePages();

	return (
		<div className="c-pagination">
			<div className="c-pagination__btn" onClick={() => changePage(0)}>
				<Icon name="chevrons-left" type="arrows" />
			</div>
			<div className="c-pagination__btn" onClick={() => changePage(currentPage - 1)}>
				<Icon name="chevron-left" type="arrows" />
			</div>
			<div className="c-pagination__pages">
				{pagesToDisplay.map((pageIndex: number) => (
					<div
						className={classNames('c-pagination__btn', {
							'c-pagination__btn--active': pageIndex === currentPage,
						})}
						onClick={() => changePage(pageIndex)}
					>
						{pageIndex + 1}
					</div>
				))}
			</div>
			<div className="c-pagination__btn" onClick={() => changePage(currentPage + 1)}>
				<Icon name="chevron-right" type="arrows" />
			</div>
			<div className="c-pagination__btn" onClick={() => changePage(pageCount - 1)}>
				<Icon name="chevrons-right" type="arrows" />
			</div>
		</div>
	);
};
