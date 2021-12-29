import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import React, { ReactNode } from 'react';

import { documentOf } from '../../helpers/document-of';

import Pagination from './Pagination';

const renderPagination = ({ pageCount = 10, ...rest }): RenderResult => {
	return render(<Pagination pageCount={pageCount} {...rest} />);
};

const renderButton = (label: string): ReactNode => {
	return <span>{label}</span>;
};

describe('<Pagination />', () => {
	it('Should be able to render', () => {
		const rendered = renderPagination({});

		const pagination = documentOf(rendered).getElementsByClassName('c-pagination');

		expect(pagination).toBeDefined();
	});

	it('Should set the correct className', () => {
		const className = 'c-custom';
		const variants = ['small', 'outline'];

		const rendered = renderPagination({ className, variants });

		const pagination = documentOf(rendered).getElementsByClassName('c-pagination')[0];

		expect(pagination).toHaveClass(className);
		expect(pagination).toHaveClass(`c-pagination--${variants[0]}`);
		expect(pagination).toHaveClass(`c-pagination--${variants[1]}`);
	});

	it('Should render pages equal to the `displayCount`', () => {
		const displayCount = 8;
		const pageCount = 20;

		const rendered = renderPagination({ displayCount, pageCount });

		const pages = documentOf(rendered).getElementsByClassName('c-pagination__pages')[0];

		expect(pages.children).toHaveLength(displayCount);
	});

	it('Should render pages equal to the `pageCount` if it is less than the `displayCount`', () => {
		const pageCount = 4;
		const displayCount = 8;

		const rendered = renderPagination({ displayCount, pageCount });

		const pages = documentOf(rendered).getElementsByClassName('c-pagination__pages')[0];

		expect(pages.children).toHaveLength(pageCount);
	});

	it('Should render the current page in an active state', () => {
		const currentPage = 0;
		const rendered = renderPagination({ currentPage });

		const activePage =
			documentOf(rendered).getElementsByClassName('c-pagination__pages')[0].firstChild;

		expect(activePage).toHaveClass('c-pagination__btn--active');
	});

	it('Should correctly set the `currentPage`', () => {
		const currentPage = 4;

		const rendered = renderPagination({ currentPage });

		const activePage = documentOf(rendered).getElementsByClassName(
			'c-pagination__btn--active'
		)[0];

		expect(activePage.textContent).toEqual(String(currentPage + 1));
	});

	it('Should render pages padded around the current page based on the `displayCount`', () => {
		const currentPage = 4; // index, number displayed is 5
		const pagesToRender = [3, 4, 5, 6, 7];

		const rendered = renderPagination({ currentPage });

		const pages = documentOf(rendered).getElementsByClassName('c-pagination__pages')[0];

		expect(pages.textContent).toEqual(pagesToRender.join(''));
	});

	it('Should render the first x pages when the current page is lower than the (odd) `displayCount`', () => {
		const currentPage = 2;
		const pagesToRender = [1, 2, 3, 4, 5];

		const rendered = renderPagination({ currentPage });

		const pages = documentOf(rendered).getElementsByClassName('c-pagination__pages')[0];

		expect(pages.textContent).toEqual(pagesToRender.join(''));
	});

	it('Should render the first x pages when the current page is lower than the (even) `displayCount`', () => {
		const currentPage = 1;
		const displayCount = 4;
		const pagesToRender = [1, 2, 3, 4];

		const rendered = renderPagination({ currentPage, displayCount });

		const pages = documentOf(rendered).getElementsByClassName('c-pagination__pages')[0];

		expect(pages.textContent).toEqual(pagesToRender.join(''));
	});

	it('Should render the last x pages when if the currentPage is equal less than the `pageCount` minus the (odd) `displayCount`', () => {
		const currentPage = 9;
		const pagesToRender = [6, 7, 8, 9, 10];

		const rendered = renderPagination({ currentPage });

		const pages = documentOf(rendered).getElementsByClassName('c-pagination__pages')[0];

		expect(pages.textContent).toEqual(pagesToRender.join(''));
	});

	it('Should render the last x pages when if the currentPage is equal less than the `pageCount` minus the (even) `displayCount`', () => {
		const currentPage = 9;
		const displayCount = 4;
		const pagesToRender = [7, 8, 9, 10];

		const rendered = renderPagination({ currentPage, displayCount });

		const pages = documentOf(rendered).getElementsByClassName('c-pagination__pages')[0];

		expect(pages.textContent).toEqual(pagesToRender.join(''));
	});

	it('Should call `onPageChange` when changing pages internally', () => {
		const onPageChange = jest.fn();
		const buttonIndex = 2;

		const rendered = renderPagination({ onPageChange });

		const button = documentOf(rendered)
			.getElementsByClassName('c-pagination__pages')[0]
			.getElementsByClassName('c-pagination__btn')[buttonIndex];

		fireEvent.click(button);

		expect(onPageChange).toHaveBeenCalledTimes(1);
		expect(onPageChange).toHaveBeenCalledWith(buttonIndex);
	});

	it('Should not call `onPageChange` when changing page to the current page', () => {
		const onPageChange = jest.fn();
		const activeIndex = 2;

		const rendered = renderPagination({ onPageChange, currentPage: activeIndex });

		const button = documentOf(rendered)
			.getElementsByClassName('c-pagination__pages')[0]
			.getElementsByClassName('c-pagination__btn')[activeIndex];

		fireEvent.click(button);

		expect(onPageChange).toHaveBeenCalledTimes(0);
	});

	it('Should be able to jump to the previous page', () => {
		const onPageChange = jest.fn();
		const activeIndex = 2;
		const buttonLabel = 'previous';
		const buttons = {
			previous: renderButton(buttonLabel),
		};

		renderPagination({
			onPageChange,
			currentPage: activeIndex,
			buttons,
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
		const buttons = {
			next: renderButton(buttonLabel),
		};

		renderPagination({
			onPageChange,
			currentPage: activeIndex,
			buttons,
		});

		const button = screen.getByText(buttonLabel);

		fireEvent.click(button);

		expect(onPageChange).toHaveBeenCalledTimes(1);
		expect(onPageChange).toHaveBeenCalledWith(activeIndex + 1);
	});

	it('Should be able to jump to the first page', () => {
		const onPageChange = jest.fn();
		const activeIndex = 2;
		const showFirstLastButtons = true;
		const buttonLabel = 'first';
		const buttons = {
			first: renderButton(buttonLabel),
		};

		renderPagination({
			onPageChange,
			currentPage: activeIndex,
			buttons,
			showFirstLastButtons,
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
		const showFirstLastButtons = true;
		const buttonLabel = 'last';
		const buttons = {
			last: renderButton(buttonLabel),
		};

		renderPagination({
			onPageChange,
			currentPage: activeIndex,
			buttons,
			pageCount,
			showFirstLastButtons,
		});

		const button = screen.getByText(buttonLabel);

		fireEvent.click(button);

		expect(onPageChange).toHaveBeenCalledTimes(1);
		expect(onPageChange).toHaveBeenCalledWith(pageCount - 1);
	});

	it('Should render first and last page buttons', () => {
		const showFirstLastButtons = true;
		const buttonLabelLast = 'last';
		const buttonLabelFirst = 'first';
		const buttons = {
			last: renderButton(buttonLabelLast),
			first: renderButton(buttonLabelFirst),
		};

		renderPagination({
			buttons,
			showFirstLastButtons,
		});

		const buttonLast = screen.getByText(buttonLabelLast);
		const buttonFirst = screen.getByText(buttonLabelFirst);

		expect(buttonLast).toBeInTheDocument();
		expect(buttonFirst).toBeInTheDocument();
	});

	it('Should not render first and last page buttons by default', () => {
		const buttonLabelLast = 'last';
		const buttonLabelFirst = 'first';
		const buttons = {
			last: renderButton(buttonLabelLast),
			first: renderButton(buttonLabelFirst),
		};

		renderPagination({ buttons });

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
		});

		const buttonLast = screen.getByText(7);
		const buttonFirst = screen.getByText(5);

		expect(buttonLast.nextElementSibling?.textContent).toEqual('...');
		expect(buttonLast.nextElementSibling?.nextSibling?.textContent).toEqual(String(pageCount));
		expect(buttonFirst.previousSibling?.textContent).toEqual('...');
		expect(buttonFirst.previousSibling?.previousSibling?.textContent).toEqual('1');
	});

	it('Should not render first and last page numbers with ellipsis when they are already rendered', () => {
		const showFirstLastNumbers = true;
		const activeIndex = 3;
		const pageCount = 5;

		renderPagination({
			activeIndex,
			showFirstLastNumbers,
			pageCount,
		});

		const buttonLast = screen.getByText(4);
		const buttonFirst = screen.getByText(2);

		expect(buttonLast).toBeInTheDocument();
		expect(buttonLast.nextSibling?.textContent).toEqual(String(pageCount));
		expect(buttonFirst).toBeInTheDocument();
		expect(buttonFirst.previousSibling?.textContent).toEqual('1');
	});

	it('Should render buttons', () => {
		const showFirstLastButtons = true;
		const buttonPreviousLabel = 'Previous';
		const buttonNextLabel = 'Next';
		const buttonFirstLabel = 'First';
		const buttonLastLabel = 'Last';
		const buttons = {
			previous: renderButton(buttonPreviousLabel),
			next: renderButton(buttonNextLabel),
			first: renderButton(buttonFirstLabel),
			last: renderButton(buttonLastLabel),
		};

		renderPagination({
			showFirstLastButtons,
			buttons,
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
		const showFirstLastButtons = true;
		const buttonPreviousLabel = 'Previous';
		const buttonNextLabel = 'Next';
		const buttonFirstLabel = 'First';
		const buttonLastLabel = 'Last';
		const buttons = {
			previous: renderButton(buttonPreviousLabel),
			next: renderButton(buttonNextLabel),
			first: renderButton(buttonFirstLabel),
			last: renderButton(buttonLastLabel),
		};

		renderPagination({
			currentPage,
			showFirstLastButtons,
			buttons,
		});

		const buttonPrevious = screen.getByText(buttonPreviousLabel);
		const buttonNext = screen.getByText(buttonNextLabel);
		const buttonLast = screen.getByText(buttonLastLabel);
		const buttonFirst = screen.getByText(buttonFirstLabel);

		expect(buttonPrevious.parentElement).toHaveClass('c-pagination__btn--disabled');
		expect(buttonNext.parentElement).not.toHaveClass('c-pagination__btn--disabled');
		expect(buttonLast.parentElement).not.toHaveClass('c-pagination__btn--disabled');
		expect(buttonFirst.parentElement).toHaveClass('c-pagination__btn--disabled');
	});

	it('Should set disabled class on next buttons when last page is active', () => {
		const pageCount = 10;
		const currentPage = 9; // index
		const showFirstLastButtons = true;
		const buttonPreviousLabel = 'Previous';
		const buttonNextLabel = 'Next';
		const buttonFirstLabel = 'First';
		const buttonLastLabel = 'Last';
		const buttons = {
			previous: renderButton(buttonPreviousLabel),
			next: renderButton(buttonNextLabel),
			first: renderButton(buttonFirstLabel),
			last: renderButton(buttonLastLabel),
		};

		renderPagination({
			currentPage,
			pageCount,
			showFirstLastButtons,
			buttons,
		});

		const buttonPrevious = screen.getByText(buttonPreviousLabel);
		const buttonNext = screen.getByText(buttonNextLabel);
		const buttonLast = screen.getByText(buttonLastLabel);
		const buttonFirst = screen.getByText(buttonFirstLabel);

		expect(buttonPrevious.parentElement).not.toHaveClass('c-pagination__btn--disabled');
		expect(buttonNext.parentElement).toHaveClass('c-pagination__btn--disabled');
		expect(buttonLast.parentElement).toHaveClass('c-pagination__btn--disabled');
		expect(buttonFirst.parentElement).not.toHaveClass('c-pagination__btn--disabled');
	});
});
