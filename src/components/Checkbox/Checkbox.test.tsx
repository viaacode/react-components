import { fireEvent, render } from '@testing-library/react';

import Checkbox from './Checkbox';
import type { CheckboxProps } from './Checkbox.types';

const mockLabel = 'Check me!';
const mockValue = 'check-value';

const renderCheckbox = ({
	label = mockLabel,
	value = mockValue,
	...rest
}: Partial<CheckboxProps>) => {
	return render(<Checkbox {...rest} label={label} value={value} />);
};

describe('components/<Checkbox />', () => {
	it('Should set the correct className', () => {
		const rootClassName = 'root-class';
		const className = 'custom-class';
		const variants = ['large', 'rounded'];
		const { container } = renderCheckbox({ className, rootClassName, variants });

		const checkbox = container.querySelector('label');
		expect(checkbox).toHaveClass(rootClassName);
		expect(checkbox).toHaveClass(className);
		expect(checkbox).toHaveClass(`${rootClassName}--${variants[0]}`);
		expect(checkbox).toHaveClass(`${rootClassName}--${variants[1]}`);
	});

	it('Should render a label', () => {
		const customLabel = 'Checkbox label';
		const { container } = renderCheckbox({ label: customLabel });

		const label = container.querySelector('.c-checkbox__label');
		expect(label).toHaveTextContent(customLabel);
	});

	it('Should not render a label element when no label is given', () => {
		const { container } = renderCheckbox({ label: null });

		const label = container.querySelector('.c-checkbox__label');
		expect(label).not.toBeInTheDocument();
	});

	it('Should be able to be disabled', () => {
		const { container, queryByDisplayValue } = renderCheckbox({ disabled: true });

		const checkbox = container.querySelector('label');
		const input = queryByDisplayValue(mockValue);
		expect(checkbox).toHaveClass('c-checkbox--disabled');
		expect(input).toHaveAttribute('disabled');
	});

	it('Should be able to set as checked', () => {
		const { container, queryByDisplayValue } = renderCheckbox({ checked: true });

		const checkbox = container.querySelector('label');
		const input = queryByDisplayValue(mockValue);
		expect(checkbox).toHaveClass('c-checkbox--checked');
		expect(input).toHaveAttribute('checked');
	});

	it('Should be able to set id and name', () => {
		const id = 'id-check';
		const name = 'name-check';
		const { queryByDisplayValue } = renderCheckbox({ id, name });
		const input = queryByDisplayValue(mockValue);

		expect(input).toHaveAttribute('id', id);
		expect(input).toHaveAttribute('name', name);
	});

	it('Should be able to set a value', () => {
		const value = 'check';
		const { queryByDisplayValue } = renderCheckbox({ value });
		const input = queryByDisplayValue(value);

		expect(input).toHaveAttribute('value', value);
	});

	it('Should call the onBlur handler when clicked', () => {
		const onBlur = jest.fn();
		const { queryByDisplayValue } = renderCheckbox({ onBlur });

		const input = queryByDisplayValue(mockValue) as HTMLInputElement;

		fireEvent.focusIn(input);
		expect(onBlur).toHaveBeenCalledTimes(0);

		fireEvent.focusOut(input);
		expect(onBlur).toHaveBeenCalledTimes(1);
	});

	it('Should call the onChange handler when clicked', () => {
		const onChange = jest.fn();
		const { container } = renderCheckbox({ onChange });

		const checkbox = container.querySelector('label');
		fireEvent.click(checkbox as HTMLLabelElement);
		expect(onChange).toHaveBeenCalledTimes(1);
	});
});
