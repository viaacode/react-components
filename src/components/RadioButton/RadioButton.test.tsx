import { fireEvent, render } from '@testing-library/react';

import RadioButton from './RadioButton';
import type { RadioButtonProps } from './RadioButton.types';

const mockLabel = ' Check me!';

const renderRadioButton = ({ label = mockLabel, ...rest }: Partial<RadioButtonProps>) => {
	return render(<RadioButton {...rest} label={label} />);
};

describe('components/<RadioButton />', () => {
	it('Should set the correct className', () => {
		const rootClassName = 'root-class';
		const className = 'custom-class';
		const variants = ['large', 'rounded'];
		const { container } = renderRadioButton({ className, rootClassName, variants });

		const radioButton = container.querySelector('label');
		expect(radioButton).toHaveClass(rootClassName);
		expect(radioButton).toHaveClass(className);
		expect(radioButton).toHaveClass(`${rootClassName}--${variants[0]}`);
		expect(radioButton).toHaveClass(`${rootClassName}--${variants[1]}`);
	});

	it('Should render a label', () => {
		const customLabel = 'radioButton label';
		const { container } = renderRadioButton({ label: customLabel });

		const label = container.querySelector('.c-radio-button__label');
		expect(label).toHaveTextContent(customLabel);
	});

	it('Should not render a label element when no label is given', () => {
		const { container } = renderRadioButton({ label: null });

		const label = container.querySelector('.c-radio-button__label');
		expect(label).not.toBeInTheDocument();
	});

	it('Should be able to be disabled', () => {
		const { container } = renderRadioButton({ disabled: true });

		const radioButton = container.querySelector('label');
		const input = container.querySelector('input');
		expect(radioButton).toHaveClass('c-radio-button--disabled');
		expect(input).toHaveAttribute('disabled');
	});

	it('Should be able to set as checked', () => {
		const { container } = renderRadioButton({ checked: true });

		const radioButton = container.querySelector('label');
		const input = radioButton?.firstChild;
		expect(radioButton).toHaveClass('c-radio-button--checked');
		expect(input).toHaveAttribute('checked');
	});

	it('Should call the onChange handler when clicked', () => {
		const onChange = jest.fn();
		const { container } = renderRadioButton({ onChange });

		const radioButton = container.querySelector('label');
		fireEvent.click(radioButton as HTMLLabelElement);
		expect(onChange).toHaveBeenCalledTimes(1);
	});
});
