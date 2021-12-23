import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import Checkbox from './Checkbox';
import { CheckboxProps } from './Checkbox.types';

const mockLabel = ' Check me!';

const renderCheckbox = ({ label = mockLabel, ...rest }: Partial<CheckboxProps>) => {
	return render(<Checkbox {...rest} label={label} />);
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

	it('Should be able to be disabled', () => {
		const { container } = renderCheckbox({ disabled: true });

		const checkbox = container.querySelector('label');
		const input = container.querySelector('input');
		expect(checkbox).toHaveClass('c-checkbox--disabled');
		expect(input).toHaveAttribute('disabled');
	});

	it('Should be able to set as checked', () => {
		const { container } = renderCheckbox({ checked: true });

		const checkbox = container.querySelector('label');
		const input = checkbox?.firstChild;
		expect(checkbox).toHaveClass('c-checkbox--checked');
		expect(input).toHaveAttribute('checked');
	});

	it('Should call the onChange handler when clicked', () => {
		const onChange = jest.fn();
		const { container } = renderCheckbox({ onChange });

		const checkbox = container.querySelector('label');
		fireEvent.click(checkbox as HTMLLabelElement);
		expect(onChange).toHaveBeenCalledTimes(1);
	});
});
