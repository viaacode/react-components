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

		const tagList = container.getElementsByClassName('c-tag-list');

		expect(tagList).toBeDefined();
		expect(tagList).toHaveLength(1);
	});

	it('Should set the correct className', () => {
		const className = 'c-tag-list-custom';
		const variants = ['small', 'outline'];

		const { container } = renderTagList({ className, variants });

		const tagList = container.getElementsByClassName('c-tag-list')[0];
		const tagElement = tagList.getElementsByClassName('c-tag')[0];

		expect(tagList).toHaveClass(className);
		expect(tagList).toHaveClass(`c-tag-list--${variants[0]}`);
		expect(tagList).toHaveClass(`c-tag-list--${variants[1]}`);
		expect(tagElement).toHaveClass('c-tag-list__tag');
		expect(tagElement).toHaveClass(`c-tag-list__tag--${variants[0]}`);
		expect(tagElement).toHaveClass(`c-tag-list__tag--${variants[1]}`);
	});

	it('Should correctly render the labels', () => {
		const { container } = renderTagList({});
		renderTagList({ closable: true });
		renderTagList({ swatches: true });
		renderTagList({ clickable: true });

		const tagList = container.getElementsByClassName('c-tag-list')[0];
		const tagListClosable = container.getElementsByClassName('c-tag-list')[1];
		const tagListSwatches = container.getElementsByClassName('c-tag-list')[2];
		const tagListClickable = container.getElementsByClassName('c-tag-list')[3];

		[tagList, tagListClosable, tagListSwatches, tagListClickable].forEach((component) => {
			expect(component.getElementsByClassName('c-label-text')[0].textContent).toEqual(
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

		const tagElements = container.getElementsByClassName('c-label-swatch');

		expect(tagElements).toHaveLength(tagsMock.length);
	});

	it('Should be able to render without swatches', () => {
		const { container } = renderTagList({ swatches: false });

		const tagElements = container.getElementsByClassName('c-label-swatch');

		expect(tagElements).toHaveLength(0);
	});

	it('Should set the correct className for labels when rendering with swatches', () => {
		const { container } = renderTagList({ swatches: true });

		const tagList = container.getElementsByClassName('c-tag-list')[0];

		expect(tagList.getElementsByClassName('c-label-text')).toHaveLength(tagsMock.length);
		expect(tagList.getElementsByClassName('c-tag__label')).toHaveLength(0);
	});

	it('Should set the correct className for labels when rendering without swatches', () => {
		const { container } = renderTagList({ swatches: false, closable: true });

		const tagList = container.getElementsByClassName('c-tag-list')[0];

		expect(tagList.getElementsByClassName('c-label-text')).toHaveLength(0);
		expect(tagList.getElementsByClassName('c-tag__label')).toHaveLength(tagsMock.length);
	});

	it('Should not render a <p class="c-label-text"> nor <p class="c-tag__label"> when tag has no swatches & is not closable', () => {
		const { container } = renderTagList({ swatches: false, closable: false });

		const tagList = container.getElementsByClassName('c-tag-list')[0];

		expect(tagList.getElementsByTagName('p')).toHaveLength(0);
		expect(tagList.getElementsByClassName('c-label-text')).toHaveLength(0);
		expect(tagList.getElementsByClassName('c-tag__label')).toHaveLength(0);
	});

	it('Should be able to render with borders', () => {
		const { container } = renderTagList({});

		const tagElements = container.getElementsByClassName('c-tag');

		expect(tagElements).toHaveLength(tagsMock.length);
	});

	it('Should be able to render without borders', () => {
		const { container } = renderTagList({ bordered: false });

		const tagElements = container.getElementsByClassName('c-label');

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
			.getElementsByClassName('c-tag')
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

		const tagElement = container.getElementsByClassName(mockClass)[0];

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
			.getElementsByClassName('c-tag')
			[indexToClick].getElementsByTagName('span')[0];

		fireEvent.click(tagElement);

		expect(onTagClicked).toHaveBeenCalledTimes(0);
	});
});
