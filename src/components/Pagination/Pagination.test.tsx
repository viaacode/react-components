import { fireEvent, type RenderResult, render, screen } from '@testing-library/react';

import { Button } from '../Button/index';

import Pagination from './Pagination';
import type { PaginationProps } from './Pagination.types';

const renderPagination = ({ pageCount = 10, ...rest }: Partial<PaginationProps>): RenderResult => {
	return render(<Pagination pageCount={pageCount} {...rest} />);
};

describe('<Pagination />', () => {
	it('Should be able to render', () => {
		const { container } = renderPagination({});

		const pagination = container.querySelector('.c-pagination');

		expect(pagination).toBeInTheDocument();
	});

	it('Should set the correct className', () => {
		const className = 'c-custom';
		const variants = ['small', 'outline'];

		const { container } = renderPagination({ className, variants });

		const pagination = container.querySelector('.c-pagination');

		expect(pagination).toHaveClass(className);
		expect(pagination).toHaveClass(`c-pagination--${variants[0]}`);
		expect(pagination).toHaveClass(`c-pagination--${variants[1]}`);
	});

	it('Should render pages equal to the `displayCount`', () => {
		const displayCount = 8;
		const pageCount = 20;

		const { container } = renderPagination({ displayCount, pageCount });

		const pages = container.querySelector('.c-pagination__pages');

		expect(pages?.children).toHaveLength(displayCount);
	});

	it('Should render pages equal to the `pageCount` if it is less than the `displayCount`', () => {
		const pageCount = 4;
		const displayCount = 8;

		const { container } = renderPagination({ displayCount, pageCount });

		const pages = container.querySelector('.c-pagination__pages');

		expect(pages?.children).toHaveLength(pageCount);
	});

	it('Should render the current page in an active state', () => {
		const currentPage = 0;
		const { container } = renderPagination({ currentPage });

		const activePage = container.querySelector('.c-pagination__pages')?.firstChild;

		expect(activePage).toHaveClass('c-pagination__page-button--active');
	});

	it('Should correctly set the `currentPage`', () => {
		const currentPage = 4;

		const { container } = renderPagination({ currentPage });

		const activePage = container.querySelector('.c-pagination__page-button--active');

		expect(activePage?.textContent).toEqual(String(currentPage + 1));
	});

	it('Should render pages padded around the current page based on the `displayCount`', () => {
		const currentPage = 4; // index, number displayed is 5
		const pagesToRender = [3, 4, 5, 6, 7];

		const { container } = renderPagination({ currentPage });

		const pages = container.querySelector('.c-pagination__pages');

		expect(pages?.textContent).toEqual(pagesToRender.join(''));
	});

	it('Should render the first x pages when the current page is lower than the (odd) `displayCount`', () => {
		const currentPage = 2;
		const pagesToRender = [1, 2, 3, 4, 5];

		const { container } = renderPagination({ currentPage });

		const pages = container.querySelector('.c-pagination__pages');

		expect(pages?.textContent).toEqual(pagesToRender.join(''));
	});

	it('Should render the first x pages when the current page is lower than the (even) `displayCount`', () => {
		const currentPage = 1;
		const displayCount = 4;
		const pagesToRender = [1, 2, 3, 4];

		const { container } = renderPagination({ currentPage, displayCount });

		const pages = container.querySelector('.c-pagination__pages');

		expect(pages?.textContent).toEqual(pagesToRender.join(''));
	});

	it('Should render the last x pages when if the currentPage is equal less than the `pageCount` minus the (odd) `displayCount`', () => {
		const currentPage = 9;
		const pagesToRender = [6, 7, 8, 9, 10];

		const { container } = renderPagination({ currentPage });

		const pages = container.querySelector('.c-pagination__pages');

		expect(pages?.textContent).toEqual(pagesToRender.join(''));
	});

	it('Should render the last x pages when if the currentPage is equal less than the `pageCount` minus the (even) `displayCount`', () => {
		const currentPage = 9;
		const displayCount = 4;
		const pagesToRender = [7, 8, 9, 10];

		const { container } = renderPagination({ currentPage, displayCount });

		const pages = container.querySelector('.c-pagination__pages');

		expect(pages?.textContent).toEqual(pagesToRender.join(''));
	});

	it('Should call `onPageChange` when changing pages internally', () => {
		const onPageChange = jest.fn();
		const buttonIndex = 2;

		const { container } = renderPagination({ onPageChange });

		const button = container
			.getElementsByClassName('c-pagination__pages')[0]
			.getElementsByClassName('c-pagination__page-button')[buttonIndex];

		fireEvent.click(button);

		expect(onPageChange).toHaveBeenCalledTimes(1);
		expect(onPageChange).toHaveBeenCalledWith(buttonIndex);
	});

	it('Should not call `onPageChange` when changing page to the current page', () => {
		const onPageChange = jest.fn();
		const activeIndex = 2;

		const { container } = renderPagination({ onPageChange, currentPage: activeIndex });

		const button = container
			.getElementsByClassName('c-pagination__pages')[0]
			.getElementsByClassName('c-pagination__page-button')[activeIndex];

		fireEvent.click(button);

		expect(onPageChange).toHaveBeenCalledTimes(0);
	});

	it('Should be able to jump to the previous page', () => {
		const onPageChange = jest.fn();
		const activeIndex = 2;
		const buttonLabel = 'previous';

		renderPagination({
			onPageChange,
			currentPage: activeIndex,
			renderPreviousButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonLabel} />
			),
		});

		const button = screen.getByText(buttonLabel);

		fireEvent.click(button);

		expect(onPageChange).toHaveBeenCalledTimes(1);
		expect(onPageChange).toHaveBeenCalledWith(activeIndex - 1);
	});

	it('Should be able to jump to the next page', () => {
		const onPageChange = jest.fn();
		const activeIndex = 2;
		const buttonLabel = 'next';

		renderPagination({
			onPageChange,
			currentPage: activeIndex,
			renderNextButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonLabel} />
			),
		});

		const button = screen.getByText(buttonLabel);

		fireEvent.click(button);

		expect(onPageChange).toHaveBeenCalledTimes(1);
		expect(onPageChange).toHaveBeenCalledWith(activeIndex + 1);
	});

	it('Should be able to jump to the first page', () => {
		const onPageChange = jest.fn();
		const activeIndex = 2;
		const buttonLabel = 'first';

		renderPagination({
			onPageChange,
			currentPage: activeIndex,
			renderFirstButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonLabel} />
			),
		});

		const button = screen.getByText(buttonLabel);

		fireEvent.click(button);

		expect(onPageChange).toHaveBeenCalledTimes(1);
		expect(onPageChange).toHaveBeenCalledWith(0);
	});

	it('Should be able to jump to the last page', () => {
		const onPageChange = jest.fn();
		const pageCount = 20;
		const activeIndex = 2;
		const buttonLabel = 'last';

		renderPagination({
			onPageChange,
			currentPage: activeIndex,
			renderLastButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonLabel} />
			),
			pageCount,
		});

		const button = screen.getByText(buttonLabel);

		fireEvent.click(button);

		expect(onPageChange).toHaveBeenCalledTimes(1);
		expect(onPageChange).toHaveBeenCalledWith(pageCount - 1);
	});

	it('Should render first and last page buttons', () => {
		const buttonLabelFirst = 'first';
		const buttonLabelLast = 'last';

		renderPagination({
			renderFirstButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonLabelFirst} />
			),
			renderLastButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonLabelLast} />
			),
		});

		const buttonLast = screen.getByText(buttonLabelLast);
		const buttonFirst = screen.getByText(buttonLabelFirst);

		expect(buttonLast).toBeInTheDocument();
		expect(buttonFirst).toBeInTheDocument();
	});

	it('Should not render first and last page buttons by default', () => {
		const buttonLabelFirst = 'first';
		const buttonLabelLast = 'last';

		renderPagination({});

		const buttonLast = screen.queryByText(buttonLabelLast);
		const buttonFirst = screen.queryByText(buttonLabelFirst);

		expect(buttonLast).toBeNull();
		expect(buttonFirst).toBeNull();
	});

	it('Should render first and last page numbers with ellipsis when padded pages are rendered', () => {
		const showFirstLastNumbers = true;
		const activeIndex = 5;
		const pageCount = 10;

		renderPagination({
			currentPage: activeIndex,
			showFirstLastNumbers,
			pageCount,
			renderFirstButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label="first" />
			),
			renderLastButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label="last" />
			),
		});

		// Pages:
		// 1 ... 5 6 7 ... 10
		const buttonPage1 = screen.getByText(1).closest('button');
		const buttonPage5 = screen.getByText(5).closest('button');
		const buttonPage7 = screen.getByText(7).closest('button');
		const buttonPage10 = screen.getByText(10).closest('button');

		expect(buttonPage1?.previousElementSibling).toBeNull();
		expect(buttonPage1?.nextElementSibling?.textContent).toEqual('...');

		expect(buttonPage5?.previousElementSibling?.textContent).toEqual('...');
		expect(buttonPage5?.nextElementSibling?.textContent).toEqual('6');

		expect(buttonPage7?.previousElementSibling?.textContent).toEqual('6');
		expect(buttonPage7?.nextElementSibling?.textContent).toEqual('...');

		expect(buttonPage10?.previousElementSibling?.textContent).toEqual('...');
		expect(buttonPage10?.nextElementSibling).toBeNull();
	});

	it('Should not render first and last page numbers with ellipsis when they are already rendered', () => {
		const showFirstLastNumbers = true;
		const currentPage = 3;
		const pageCount = 5;

		// Pages:
		// 1 2 3 4 5
		renderPagination({
			currentPage,
			showFirstLastNumbers,
			pageCount,
		});

		const buttonFirst = screen.getByText(2).closest('button');
		const buttonLast = screen.getByText(4).closest('button');

		expect(buttonLast).toBeInTheDocument();
		expect(buttonLast?.nextSibling?.textContent).toEqual(String(pageCount));
		expect(buttonFirst).toBeInTheDocument();
		expect(buttonFirst?.previousSibling?.textContent).toEqual('1');
	});

	it('Should render buttons', () => {
		const buttonFirstLabel = 'First';
		const buttonPreviousLabel = 'Previous';
		const buttonNextLabel = 'Next';
		const buttonLastLabel = 'Last';

		renderPagination({
			renderFirstButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonFirstLabel} />
			),
			renderPreviousButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonPreviousLabel} />
			),
			renderNextButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonNextLabel} />
			),
			renderLastButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonLastLabel} />
			),
		});

		const buttonPrevious = screen.getByText(buttonPreviousLabel);
		const buttonNext = screen.getByText(buttonNextLabel);
		const buttonLast = screen.getByText(buttonLastLabel);
		const buttonFirst = screen.getByText(buttonFirstLabel);

		expect(buttonPrevious).toBeInTheDocument();
		expect(buttonNext).toBeInTheDocument();
		expect(buttonLast).toBeInTheDocument();
		expect(buttonFirst).toBeInTheDocument();
	});

	it('Should set disabled class on back buttons when first page is active', () => {
		const currentPage = 0;
		const buttonPreviousLabel = 'Previous';
		const buttonNextLabel = 'Next';
		const buttonFirstLabel = 'First';
		const buttonLastLabel = 'Last';

		renderPagination({
			currentPage,
			renderFirstButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonFirstLabel} />
			),
			renderPreviousButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonPreviousLabel} />
			),
			renderNextButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonNextLabel} />
			),
			renderLastButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonLastLabel} />
			),
		});

		const buttonPrevious = screen.getByText(buttonPreviousLabel);
		const buttonNext = screen.getByText(buttonNextLabel);
		const buttonLast = screen.getByText(buttonLastLabel);
		const buttonFirst = screen.getByText(buttonFirstLabel);

		expect(buttonPrevious.parentElement?.parentElement).toHaveClass('c-button--disabled');
		expect(buttonNext.parentElement?.parentElement).not.toHaveClass('c-button--disabled');
		expect(buttonLast.parentElement?.parentElement).not.toHaveClass('c-button--disabled');
		expect(buttonFirst.parentElement?.parentElement).toHaveClass('c-button--disabled');
	});

	it('Should set disabled class on next buttons when last page is active', () => {
		const pageCount = 10;
		const currentPage = 9; // index
		const buttonFirstLabel = 'First';
		const buttonPreviousLabel = 'Previous';
		const buttonNextLabel = 'Next';
		const buttonLastLabel = 'Last';

		renderPagination({
			currentPage,
			pageCount,
			renderFirstButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonFirstLabel} />
			),
			renderPreviousButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonPreviousLabel} />
			),
			renderNextButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonNextLabel} />
			),
			renderLastButton: (onClick, disabled) => (
				<Button onClick={onClick} disabled={disabled} label={buttonLastLabel} />
			),
		});

		const buttonPrevious = screen.getByText(buttonPreviousLabel);
		const buttonNext = screen.getByText(buttonNextLabel);
		const buttonLast = screen.getByText(buttonLastLabel);
		const buttonFirst = screen.getByText(buttonFirstLabel);

		expect(buttonPrevious.parentElement?.parentElement).not.toHaveClass('c-button--disabled');
		expect(buttonNext.parentElement?.parentElement).toHaveClass('c-button--disabled');
		expect(buttonLast.parentElement?.parentElement).toHaveClass('c-button--disabled');
		expect(buttonFirst.parentElement?.parentElement).not.toHaveClass('c-button--disabled');
	});
});
