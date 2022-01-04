import clsx from 'clsx';
import React, { Fragment, FunctionComponent, ReactNode } from 'react';

import { bemCls, getVariantClasses } from '../../utils';

import { PaginationProps } from './Pagination.types';

const Pagination: FunctionComponent<PaginationProps> = ({
	className,
	pageCount,
	displayCount = 5,
	currentPage = 0,
	onPageChange = () => null,
	showFirstLastButtons,
	showFirstLastNumbers,
	buttons,
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
			<div
				key={pageIndex}
				className={clsx(bem('btn'), pageIndex === currentPage && bem('btn', 'active'))}
				onClick={pageIndex !== currentPage ? () => changePage(pageIndex) : () => null}
				onKeyPress={(e) => (e.key === 'Enter' ? changePage(pageIndex) : () => null)}
				role="button"
				tabIndex={0}
			>
				{pageIndex + 1}
			</div>
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
			{showFirstLastButtons && buttons?.first && (
				<div
					className={clsx(bem('btn'), currentPage === 0 && bem('btn', 'disabled'))}
					onClick={() => changePage(0)}
					onKeyPress={(e) => (e.key === 'Enter' ? changePage(0) : () => null)}
					role="button"
					tabIndex={0}
				>
					{buttons?.first}
				</div>
			)}
			{buttons?.previous && (
				<div
					className={clsx(bem('btn'), currentPage === 0 && bem('btn', 'disabled'))}
					onClick={() => changePage(currentPage - 1)}
					onKeyPress={(e) =>
						e.key === 'Enter' ? changePage(currentPage - 1) : () => null
					}
					role="button"
					tabIndex={0}
				>
					{buttons?.previous}
				</div>
			)}
			<div className={bem('pages')}>{renderPages()}</div>
			{buttons?.next && (
				<div
					className={clsx(
						bem('btn'),
						currentPage === pageCount - 1 && bem('btn', 'disabled')
					)}
					onClick={() => changePage(currentPage + 1)}
					onKeyPress={(e) =>
						e.key === 'Enter' ? changePage(currentPage + 1) : () => null
					}
					role="button"
					tabIndex={0}
				>
					{buttons?.next}
				</div>
			)}
			{showFirstLastButtons && buttons?.last && (
				<div
					className={clsx(
						bem('btn'),
						currentPage === pageCount - 1 && bem('btn', 'disabled')
					)}
					onClick={() => changePage(pageCount - 1)}
					onKeyPress={(e) => (e.key === 'Enter' ? changePage(pageCount - 1) : () => null)}
					role="button"
					tabIndex={0}
				>
					{buttons?.last}
				</div>
			)}
		</div>
	);
};

export default Pagination;
