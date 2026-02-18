import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import TextArea from './TextArea';
import type { TextAreaProps } from './TextArea.types';

const mockValue = 'Text value';

const renderTextArea = (
	{ value = mockValue, ...rest }: Partial<TextAreaProps> = { ariaLabel: 'test' }
) => {
	return render(<TextArea {...(rest as TextAreaProps)} value={value} />);
};

describe('components/<TextArea />', () => {
	it('Should set the correct className', () => {
		const ariaLabel = 'label';
		const rootClassName = 'root-class';
		const className = 'custom-class';
		const variants = ['large', 'rounded'];
		renderTextArea({ className, rootClassName, variants, ariaLabel });

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
		renderTextArea({ id, placeholder, rows, ariaLabel: 'test' });

		const textarea = screen.queryByDisplayValue(mockValue);
		expect(textarea).toHaveAttribute('id', id);
		expect(textarea).toHaveAttribute('placeholder', placeholder);
		expect(textarea).toHaveAttribute('rows', rows.toString());
	});

	it('Should call the onChange handler on every input', async () => {
		const inputValue = 'My value';
		const onChange = jest.fn();
		renderTextArea({ onChange, ariaLabel: 'test' });

		const textarea = screen.getByDisplayValue(mockValue);
		await userEvent.type(textarea, inputValue);
		expect(onChange).toHaveBeenCalledTimes(inputValue.length);
	});
});
