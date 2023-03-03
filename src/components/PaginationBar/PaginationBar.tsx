import clsx from 'clsx';
import React, { FC } from 'react';

import { Button } from '../Button';
import Pagination from '../Pagination/Pagination';
import { PaginationProgress } from '../PaginationProgress';

import { PaginationBarProps } from './PaginationBar.types';

const PaginationBar: FC<PaginationBarProps> = ({
	className,
	count,
	onPageChange,
	showBackToTop,
	nextLabel,
	nextIcon,
	previousLabel,
	previousIcon,
	backToTopLabel,
	backToTopIcon,
	start,
	total,
}) => {
	const pageCount = Math.ceil(total / count);
	const currentPage = start / count;

	const renderProgress = () => {
		const end = start + count;

		return <PaginationProgress {...{ start: start + 1, end, total }} />;
	};

	const scrollTo = (yLocation = 0): void => {
		window.scrollTo({ top: yLocation, left: 0, behavior: 'smooth' });
	};

	const renderPagination = () => (
		<Pagination
			buttons={{
				next: (
					<Button
						className="u-pl-24:sm u-pl-8"
						disabled={currentPage + 1 === pageCount}
						variants={['text', 'neutral']}
						label={nextLabel}
						iconEnd={nextIcon}
					/>
				),
				previous: (
					<Button
						className="u-pr-24:sm u-pr-8"
						disabled={currentPage + 1 === 1}
						variants={['text', 'neutral']}
						label={previousLabel}
						iconStart={previousIcon}
					/>
				),
			}}
			showFirstLastNumbers
			onPageChange={onPageChange}
			currentPage={currentPage}
			pageCount={pageCount}
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

			{total > count && renderPagination()}

			{showBackToTop && (
				<div className="c-pagination-bar__back-to-top-wrapper">
					<Button
						className="c-pagination-bar__back-to-top"
						variants={['text', 'neutral']}
						label={backToTopLabel}
						iconEnd={backToTopIcon}
						onClick={() => scrollTo(0)}
					/>
				</div>
			)}
		</div>
	);
};

export default PaginationBar;
