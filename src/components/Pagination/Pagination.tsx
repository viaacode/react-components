import clsx from 'clsx';
import React, { Fragment, type FunctionComponent, type ReactNode } from 'react';

import { bemCls, getVariantClasses } from '../../utils';
import { Button } from '../Button';

import type { PaginationProps } from './Pagination.types';

const Pagination: FunctionComponent<PaginationProps> = ({
	className,
	pageCount,
	displayCount = 5,
	currentPage = 0,
	onPageChange = () => null,
	showFirstLastNumbers,
	renderPreviousButton,
	renderNextButton,
	renderFirstButton,
	renderLastButton,
	rootClassName: root = 'c-pagination',
	variants,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants));

	const changePage = (page: number) => {
		if (page >= 0 && page <= pageCount - 1) {
			onPageChange(page);
		}
	};

	const generatePages = () => {
		// generate all pages if pageCount is less than the displayCount
		if (pageCount < displayCount) {
			return Array.from({ length: pageCount }, (_, index: number) => index);
		}

		// generate first x pages if currentPage is less than the displayCount
		if (currentPage < displayCount / 2) {
			return Array.from({ length: displayCount }, (_, index: number) => index);
		}

		// generate last x pages if currentPage is less than the pageCount - displayCount
		if (currentPage >= Math.ceil(pageCount - displayCount / 2)) {
			return Array.from(
				{ length: displayCount },
				(_, index: number) => pageCount - (displayCount - index)
			);
		}

		// generate x pages padding the current page
		return Array.from(
			{ length: displayCount },
			(_, index: number) => index + currentPage - Math.ceil(displayCount / 2) + 1
		);
	};

	const renderNumber = (pageIndex: number): ReactNode => {
		return (
			<Button
				key={`c-pagination__page-button__${pageIndex}`}
				className={clsx('c-pagination__page-button', {
					'c-pagination__page-button--active': pageIndex === currentPage,
					'c-pagination__page-button--long': pageIndex.toString().length > 3,
				})}
				disabled={currentPage === pageIndex}
				label={pageIndex + 1}
				onClick={pageIndex !== currentPage ? () => changePage(pageIndex) : () => null}
			/>
		);
	};

	const renderPages = (): ReactNode => {
		return pagesToDisplay.map((pageIndex: number, index: number): ReactNode => {
			let showStartEllipsis = false;
			let showEndEllipsis = false;
			let indexToDisplay = pageIndex;

			if (showFirstLastNumbers) {
				if (index === 0 && pagesToDisplay[1] > 1) {
					showStartEllipsis = true;
					indexToDisplay = 0;
				}
				if (
					index === displayCount - 1 &&
					pagesToDisplay[pagesToDisplay.length - 2] < pageCount - 2 // Note: pageCount - 2 because pageCount starts at 1 and the values in pagesToDisplay start at 0
				) {
					showEndEllipsis = true;
					indexToDisplay = pageCount - 1;
				}
			}

			return (
				<Fragment key={`wrapper-${indexToDisplay}`}>
					{showEndEllipsis && <span className={bem('ellipsis')}>...</span>}
					{renderNumber(indexToDisplay)}
					{showStartEllipsis && <span className={bem('ellipsis')}>...</span>}
				</Fragment>
			);
		});
	};

	const pagesToDisplay = generatePages();

	return (
		<div className={rootCls}>
			{renderFirstButton?.(() => changePage(0), currentPage === 0)}
			{renderPreviousButton?.(() => changePage(currentPage - 1), currentPage === 0)}
			<div className={bem('pages')}>{renderPages()}</div>
			{renderNextButton?.(() => changePage(currentPage + 1), currentPage === pageCount - 1)}
			{renderLastButton?.(() => changePage(pageCount - 1), currentPage === pageCount - 1)}
		</div>
	);
};

export default Pagination;
