import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { TextInput } from './TextInput';
import type { TextInputProps } from './TextInput.types';

const mockValue = 'Text value';

const renderTextInput = (
	{ value = mockValue, onChange, ...rest }: Partial<TextInputProps> = { ariaLabel: 'test' }
) => {
	return render(<TextInput {...(rest as TextInputProps)} value={value} onChange={onChange} />);
};

describe('components/<TextInput />', () => {
	it('Should set the correct className', () => {
		const rootClassName = 'root-class';
		const className = 'custom-class';
		const variants = ['large', 'rounded'];
		renderTextInput({ className, rootClassName, variants, ariaLabel: 'test' });

		const input = screen.getByDisplayValue(mockValue);
		const inputContainer = input.parentElement;
		expect(input).toHaveClass(`${rootClassName}__field`);
		expect(inputContainer).toHaveClass(rootClassName);
		expect(inputContainer).toHaveClass(className);
		expect(inputContainer).toHaveClass(`${rootClassName}--${variants[0]}`);
		expect(inputContainer).toHaveClass(`${rootClassName}--${variants[1]}`);
	});

	it('Should pass the correct input attributes', () => {
		const ariaLabel = 'label';
		const id = 'input-id';
		const placeholder = 'placeholder';
		const type = 'tel';
		renderTextInput({ ariaLabel, id, placeholder, type });

		const input = screen.queryByDisplayValue(mockValue);
		expect(input).toHaveAttribute('aria-label', ariaLabel);
		expect(input).toHaveAttribute('id', id);
		expect(input).toHaveAttribute('placeholder', placeholder);
		expect(input).toHaveAttribute('type', type);
	});

	it('Should call the onChange handler on every input', async () => {
		const ariaLabel = 'label';
		const inputValue = 'My value';
		const onChange = jest.fn();
		renderTextInput({ onChange, ariaLabel });

		const input = screen.getByDisplayValue(mockValue);
		await userEvent.type(input, inputValue);
		expect(onChange).toHaveBeenCalledTimes(inputValue.length);
	});
});
