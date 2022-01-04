import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import React, { ReactNode } from 'react';

import TagList from './TagList';
import { tags as tagsMock } from './__mocks__';

const renderLabel = (label: string, className: string): ReactNode => {
	return <span className={className}>{label}</span>;
};

const renderTagList = ({ tags = tagsMock, ...rest }): RenderResult => {
	return render(<TagList tags={tags} {...rest} />);
};

describe('<TagList />', () => {
	it('Should be able to render', () => {
		const { container } = renderTagList({});

		const tagList = container.querySelector('.c-tag-list');

		expect(tagList).toBeInTheDocument();
	});

	it('Should set the correct className', () => {
		const className = 'c-tag-list-custom';
		const variants = ['small', 'outline'];

		const { container } = renderTagList({ className, variants });

		const tagList = container.querySelector('.c-tag-list');
		const tagElement = tagList?.querySelector('.c-tag');

		expect(tagList).toHaveClass(className);
		expect(tagList).toHaveClass(`c-tag-list--${variants[0]}`);
		expect(tagList).toHaveClass(`c-tag-list--${variants[1]}`);
		expect(tagElement).toHaveClass('c-tag-list__tag');
		expect(tagElement).toHaveClass(`c-tag-list__tag--${variants[0]}`);
		expect(tagElement).toHaveClass(`c-tag-list__tag--${variants[1]}`);
	});

	it('Should correctly render the labels', () => {
		const rendered = renderTagList({});
		const renderedClosable = renderTagList({ closable: true });
		const renderedSwatches = renderTagList({ swatches: true });
		const renderedClickable = renderTagList({ clickable: true });

		const tagList = rendered.container.querySelector('.c-tag-list');
		const tagListClosable = renderedClosable.container.querySelector('.c-tag-list');
		const tagListSwatches = renderedSwatches.container.querySelector('.c-tag-list');
		const tagListClickable = renderedClickable.container.querySelector('.c-tag-list');

		[tagList, tagListClosable, tagListSwatches, tagListClickable].forEach((component) => {
			expect(component?.querySelector('.c-label-text')?.textContent).toEqual(
				tagsMock[0].label
			);
		});
	});

	it('Should correctly render labels of type ReactNode', () => {
		const mockLabel = 'label';
		const mockClass = 'custom-label';
		const tagMock = [
			{
				label: renderLabel(mockLabel, mockClass),
				id: 'id',
			},
		];
		renderTagList({ tags: tagMock });

		const tagList = screen.getByText(mockLabel);

		expect(tagList).toHaveClass(mockClass);
	});

	it('Should be able to render with swatches', () => {
		const { container } = renderTagList({ swatches: true });

		const tagElements = container.querySelectorAll('.c-label-swatch');

		expect(tagElements).toHaveLength(tagsMock.length);
	});

	it('Should be able to render without swatches', () => {
		const { container } = renderTagList({ swatches: false });

		const tagElements = container.querySelectorAll('.c-label-swatch');

		expect(tagElements).toHaveLength(0);
	});

	it('Should set the correct className for labels when rendering with swatches', () => {
		const { container } = renderTagList({ swatches: true });

		const tagList = container.querySelector('.c-tag-list');

		expect(tagList?.querySelectorAll('.c-label-text')).toHaveLength(tagsMock.length);
		expect(tagList?.querySelectorAll('.c-tag__label')).toHaveLength(0);
	});

	it('Should set the correct className for labels when rendering without swatches', () => {
		const { container } = renderTagList({ swatches: false, closable: true });

		const tagList = container.querySelector('.c-tag-list');

		expect(tagList?.querySelectorAll('.c-label-text')).toHaveLength(0);
		expect(tagList?.querySelectorAll('.c-tag__label')).toHaveLength(tagsMock.length);
	});

	it('Should not render a <p class="c-label-text"> nor <p class="c-tag__label"> when tag has no swatches & is not closable', () => {
		const { container } = renderTagList({ swatches: false, closable: false });

		const tagList = container.querySelector('.c-tag-list');

		expect(tagList?.getElementsByTagName('p')).toHaveLength(0);
		expect(tagList?.querySelectorAll('.c-label-text')).toHaveLength(0);
		expect(tagList?.querySelectorAll('.c-tag__label')).toHaveLength(0);
	});

	it('Should be able to render with borders', () => {
		const { container } = renderTagList({});

		const tagElements = container.querySelectorAll('.c-tag');

		expect(tagElements).toHaveLength(tagsMock.length);
	});

	it('Should be able to render without borders', () => {
		const { container } = renderTagList({ bordered: false });

		const tagElements = container.querySelectorAll('.c-label');

		expect(tagElements).toHaveLength(tagsMock.length);
	});

	it('Should be able to render close buttons', () => {
		const mockLabel = 'close';

		renderTagList({
			closable: true,
			closeIcon: <span className="custom-close-button">{mockLabel}</span>,
		});

		const closeTagIcons = screen.getAllByText(mockLabel);

		expect(closeTagIcons).toHaveLength(tagsMock.length);
		expect(closeTagIcons[0]).toHaveClass('custom-close-button');
	});

	it('Should call `onTagClosed` when closing a tag', () => {
		const mockLabel = 'close';
		const indexToClose = 5;
		const onTagClosed = jest.fn();

		renderTagList({ closable: true, closeIcon: <span>{mockLabel}</span>, onTagClosed });

		const closeTagIcons = screen.getAllByText(mockLabel);

		fireEvent.click(closeTagIcons[indexToClose]);

		expect(onTagClosed).toHaveBeenCalled();
		expect(onTagClosed).toHaveBeenCalledTimes(1);
	});

	it('Should call `onTagClicked` when clicking a tag', () => {
		const indexToClick = 5;
		const onTagClicked = jest.fn();

		const { container } = renderTagList({ onTagClicked });

		const tagElement = container
			.querySelectorAll('.c-tag')
			[indexToClick].getElementsByTagName('span')[0];

		fireEvent.click(tagElement);

		expect(onTagClicked).toHaveBeenCalled();
		expect(onTagClicked).toHaveBeenCalledTimes(1);
	});

	it('Should set disabled class variant when disabled = true', () => {
		const mockClass = 'c-tag-list__tag';
		const tagMock = [
			{
				label: 'tag',
				id: 'tag',
				disabled: true,
			},
		];
		const { container } = renderTagList({ tags: tagMock });

		const tagElement = container.querySelector(`.${mockClass}`);

		expect(tagElement).toHaveClass(`${mockClass}--disabled`);
	});

	it('Should not call `onTagClicked` when clicking a disabled tag', () => {
		const indexToClick = 0;
		const tagMock = [
			{
				label: 'tag',
				id: 'tag',
				disabled: true,
			},
		];
		const onTagClicked = jest.fn();

		const { container } = renderTagList({ tags: tagMock, onTagClicked });

		const tagElement = container
			.querySelectorAll('.c-tag')
			[indexToClick].getElementsByTagName('span')[0];

		fireEvent.click(tagElement);

		expect(onTagClicked).toHaveBeenCalledTimes(0);
	});
});
