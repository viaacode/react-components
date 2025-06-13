import clsx from 'clsx';
import React, { type FC } from 'react';

import { Button } from '../Button';
import Pagination from '../Pagination/Pagination';
import { PaginationProgress } from '../PaginationProgress';

import type { PaginationBarProps } from './PaginationBar.types';

import './PaginationBar.scss';

const PaginationBar: FC<PaginationBarProps> = ({
	className,
	startItem,
	totalItems,
	itemsPerPage,
	displayCount = 5,
	onPageChange,
	onScrollToTop,
	showBackToTop = true,
	showProgress = true,
	showFirstAndLastButtons = false,
	showButtonLabels = false,
	nextLabel,
	nextIcon,
	previousLabel,
	previousIcon,
	firstLabel,
	firstIcon,
	lastLabel,
	lastIcon,
	backToTopLabel,
	backToTopIcon,
	labelBetweenPageStartAndEnd,
	labelBetweenPageEndAndTotal,
}) => {
	const pageCount = Math.ceil(totalItems / itemsPerPage);
	const currentPage = startItem / itemsPerPage;

	const handleScrollToTop = () => {
		if (onScrollToTop) {
			onScrollToTop();
		} else {
			window.scrollTo(0, 0);
		}
	};

	const renderProgress = () => {
		const endItem = startItem + itemsPerPage;

		// Keep the div, so flexbox positions the page buttons in the center
		return (
			<div className="c-pagination-bar__progress">
				{showProgress && (
					<PaginationProgress
						{...{ startItem: startItem + 1, endItem, totalItems }}
						labelBetweenPageStartAndEnd={labelBetweenPageStartAndEnd}
						labelBetweenPageEndAndTotal={labelBetweenPageEndAndTotal}
					/>
				)}
			</div>
		);
	};

	const renderPreviousButton = (onClick: () => void, disabled: boolean) => {
		return (
			<Button
				disabled={disabled}
				label={showButtonLabels ? previousLabel : undefined}
				iconStart={previousIcon}
				aria-label={previousLabel}
				onClick={onClick}
			/>
		);
	};

	const renderNextButton = (onClick: () => void, disabled: boolean) => {
		return (
			<Button
				disabled={disabled}
				label={showButtonLabels ? nextLabel : undefined}
				iconEnd={nextIcon}
				aria-label={nextLabel}
				onClick={onClick}
			/>
		);
	};

	const renderFirstButton = (onClick: () => void, disabled: boolean) => {
		if (!showFirstAndLastButtons) {
			return null;
		}
		return (
			<Button
				disabled={disabled}
				label={showButtonLabels ? firstLabel : undefined}
				iconStart={firstIcon}
				aria-label={firstLabel}
				onClick={onClick}
			/>
		);
	};

	const renderLastButton = (onClick: () => void, disabled: boolean) => {
		if (!showFirstAndLastButtons) {
			return null;
		}
		return (
			<Button
				disabled={disabled}
				label={showButtonLabels ? lastLabel : undefined}
				iconEnd={lastIcon}
				aria-label={lastLabel}
				onClick={onClick}
			/>
		);
	};

	const renderPagination = () => (
		<Pagination
			renderPreviousButton={renderPreviousButton}
			renderNextButton={renderNextButton}
			renderFirstButton={renderFirstButton}
			renderLastButton={renderLastButton}
			showFirstLastNumbers
			onPageChange={onPageChange}
			currentPage={currentPage}
			pageCount={pageCount}
			displayCount={displayCount}
		/>
	);

	return (
		<div
			className={clsx(
				className,
				'c-pagination-bar',
				showBackToTop && 'c-pagination-bar--back-to-top'
			)}
		>
			{renderProgress()}

			{itemsPerPage < totalItems && renderPagination()}

			<div className="c-pagination-bar__back-to-top-wrapper">
				{showBackToTop && (
					<Button
						className="c-pagination-bar__back-to-top"
						variants={['text', 'neutral']}
						label={backToTopLabel}
						iconEnd={backToTopIcon}
						onClick={handleScrollToTop}
					/>
				)}
			</div>
		</div>
	);
};

export default PaginationBar;
