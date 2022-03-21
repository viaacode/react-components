import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import ColorPicker from './ColorPicker';
import { ColorPickerProps } from './ColorPicker.types';

const mockColor = '#00c8aa';
const mockOnChange = () => {
	// Mock on change function
};

const renderColorPicker = ({
	color = mockColor,
	onChange = mockOnChange,
	...rest
}: Partial<ColorPickerProps>) => {
	return render(<ColorPicker {...rest} color={color} onChange={onChange} />);
};

describe('components/<ColorPicker />', () => {
	it('Should set the correct className', () => {
		const rootClassName = 'root-class';
		const className = 'custom-class';
		const { container } = renderColorPicker({ className, rootClassName });

		expect(container.firstChild).toHaveClass(rootClassName);
		expect(container.firstChild).toHaveClass(className);
	});

	it('Should render an color picker div and input field', () => {
		const { container } = renderColorPicker({ color: '#00FF00' });

		const trigger = container.querySelector('.c-color-picker__trigger');
		expect(trigger).toBeDefined();
		expect(trigger).toHaveStyle({ backgroundColor: '#00FF00' });
	});

	it('Should be able to be disabled', () => {
		const { container } = renderColorPicker({ disabled: true });

		expect(container.firstChild).toBeDefined();
		expect(container.firstChild).toHaveClass('c-color-picker__disabled');
		expect(container.querySelector('.c-color-picker__trigger')).toHaveAttribute('disabled');
		expect(container.querySelector('.c-color-picker__input')).toHaveAttribute('disabled');
	});

	it('Should be able to open the color picker', () => {
		const { container } = renderColorPicker({});

		const trigger = container?.querySelector('.c-color-picker__trigger');
		expect(trigger).toBeDefined();

		fireEvent(
			trigger as Element,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(container.querySelector('.c-color-picker__picker')).toBeVisible();
		expect(container.querySelector('.c-color-picker__underlay')).toBeVisible();
	});
});
