import { render } from '@testing-library/react';
import React from 'react';
import selectEvent from 'react-select-event';

import TagsInput from './TagsInput';
import { TagsInputProps } from './TagsInput.types';

const renderTagsInput = (props: TagsInputProps) => {
	return render(<TagsInput {...props} />);
};

describe('components/<TagsInput />', () => {
	it('Should set the correct classNames', () => {
		const className = 'custom-tags-input';
		const rootClassName = 'root-tags-input';
		const variants = ['lg', 'disabled'];
		const { container } = renderTagsInput({ className, rootClassName, variants });

		const tagsInput = container.querySelector(`.${rootClassName}`);
		expect(tagsInput).toHaveClass(rootClassName);
		expect(tagsInput).toHaveClass(className);
		expect(tagsInput).toHaveClass(`${rootClassName}--${variants[0]}`);
		expect(tagsInput).toHaveClass(`${rootClassName}--${variants[1]}`);
	});

	it('Should allow creating tags', async () => {
		const newTag = { label: 'Newtag' };
		const value = { label: 'Tag', value: 'tag' };
		const onCreateOption = jest.fn();
		const { container } = renderTagsInput({
			allowCreate: true,
			value,
			onCreateOption,
		});
		const tagsInput = container.querySelector('.c-tags-input');
		expect(tagsInput).toHaveClass('c-tags-input--creatable');

		const input = tagsInput?.querySelector('input') as HTMLInputElement;
		await selectEvent.create(input, newTag.label, { waitForElement: false });
		expect(onCreateOption).toHaveBeenCalledTimes(1);
	});
});
