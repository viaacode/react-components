import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import Tag from './Tag';
import { TagProps } from './Tag.types';

const tagId = 'tag-id';
const tagText = 'Tag label';
const tagLabel = <span data-testid={tagId}>{tagText}</span>;
const renderTag = ({ id = tagId, label = tagLabel, ...rest }: Partial<TagProps>) => {
	return render(<Tag {...rest} id={id} label={label} />);
};

describe('components/<Tag />', () => {
	it('Should set the correct classNames', () => {
		const className = 'custom-tag';
		const variants = ['small', 'bordered'];
		const { container } = renderTag({ className, variants });

		const tag = container.querySelector('.c-tag');
		expect(tag).toHaveClass(className);
		variants.forEach((variant) => {
			expect(tag).toHaveClass(`c-tag--${variant}`);
		});
	});

	it('Should be able to be set active', () => {
		const { container } = renderTag({ active: true });

		const tag = container.querySelector('.c-tag');
		expect(tag).toHaveClass('c-tag--active');
	});

	it('Should be able to be disabled', () => {
		const { container } = renderTag({ disabled: true });

		const tag = container.querySelector('.c-tag');
		expect(tag).toHaveClass('c-tag--disabled');
	});

	it('Should trigger onClick when given', () => {
		const onClick = jest.fn();
		const { container } = renderTag({ onClick });

		const tag = container.querySelector('.c-tag') as HTMLElement;

		fireEvent.click(tag);
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it('Should trigger onClose when given', () => {
		const onClose = jest.fn();
		const { container } = renderTag({ onClose });

		const tagClose = container.querySelector('.c-tag__close') as HTMLElement;
		fireEvent.click(tagClose);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('Should not render close button when onClose is undefined', () => {
		const { container } = renderTag({});

		const tagClose = container.querySelector('.c-tag__close') as HTMLElement;
		expect(tagClose).not.toBeInTheDocument();
	});

	it('Should render a custom close button when given', () => {
		const testId = 'close-btn-id';
		const { queryByTestId } = renderTag({ closeButton: <span data-testid={testId} /> });

		const closeBtn = queryByTestId(testId);
		expect(closeBtn).toBeInTheDocument();
	});
});
