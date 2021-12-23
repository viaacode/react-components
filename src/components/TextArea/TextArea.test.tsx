import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import TextArea from './TextArea';
import { TextAreaProps } from './TextArea.types';

const mockValue = 'Text value';

const renderTextArea = ({ value = mockValue, ...rest }: TextAreaProps = {}) => {
	return render(<TextArea {...rest} value={value} />);
};

describe('components/<TextArea />', () => {
	it('Should set the correct className', () => {
		const rootClassName = 'root-class';
		const className = 'custom-class';
		const variants = ['large', 'rounded'];
		renderTextArea({ className, rootClassName, variants });

		const input = screen.getByDisplayValue(mockValue);
		const inputContainer = input.parentElement;
		expect(input).toHaveClass(`${rootClassName}__field`);
		expect(inputContainer).toHaveClass(rootClassName);
		expect(inputContainer).toHaveClass(className);
		expect(inputContainer).toHaveClass(`${rootClassName}--${variants[0]}`);
		expect(inputContainer).toHaveClass(`${rootClassName}--${variants[1]}`);
	});

	it('Should pass the correct textarea attributes', () => {
		const id = 'input-id';
		const rows = 10;
		const placeholder = 'placeholder';
		renderTextArea({ id, placeholder, rows });

		const textarea = screen.queryByDisplayValue(mockValue);
		expect(textarea).toHaveAttribute('id', id);
		expect(textarea).toHaveAttribute('placeholder', placeholder);
		expect(textarea).toHaveAttribute('rows', rows.toString());
	});

	it('Should call the onChange handler on every input', () => {
		const inputValue = 'My value';
		const onChange = jest.fn();
		renderTextArea({ onChange });

		const textarea = screen.getByDisplayValue(mockValue);
		userEvent.type(textarea, inputValue);
		expect(onChange).toHaveBeenCalledTimes(inputValue.length);
	});
});
