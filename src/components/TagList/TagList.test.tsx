import { fireEvent, render, screen } from '@testing-library/react';
import React, { type ReactNode } from 'react';

import TagList from './TagList.js';
import type { TagListProps } from './TagList.types.js';
import { tags as tagsMock } from './__mocks__/tag-list.js';

const renderLabel = (label: string, className: string): ReactNode => {
	return <span className={className}>{label}</span>;
};

const renderTagList = ({ tags = tagsMock, ...rest }: Partial<TagListProps>) => {
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
		const tag = tagList?.querySelector('.c-tag-list__tag');

		expect(tagList).toHaveClass(className);
		expect(tagList).toHaveClass(`c-tag-list--${variants[0]}`);
		expect(tagList).toHaveClass(`c-tag-list--${variants[1]}`);
		expect(tag).toHaveClass('c-tag');
		expect(tag).toHaveClass(`c-tag--${variants[0]}`);
		expect(tag).toHaveClass(`c-tag--${variants[1]}`);
	});

	it('Should correctly render the labels', () => {
		const rendered = renderTagList({});

		const tagList = rendered.container.querySelector('.c-tag-list');

		expect(tagList?.querySelector('.c-tag__label')?.textContent).toEqual(tagsMock[0].label);
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

	it('Should be able to render close buttons', () => {
		const mockLabel = 'close';

		renderTagList({
			onTagClosed: () => null,
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

		renderTagList({ closeIcon: <span>{mockLabel}</span>, onTagClosed });

		const closeTagIcons = screen.getAllByText(mockLabel);

		fireEvent.click(closeTagIcons[indexToClose]);

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

		expect(onTagClicked).toHaveBeenCalledTimes(1);
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
