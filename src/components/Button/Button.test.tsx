import { fireEvent, render, screen } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';

import Button from './Button';
import { ButtonProps } from './Button.types';

const mockLabel = 'Click me!';

const renderButton = ({ children = mockLabel, ...rest }: PropsWithChildren<ButtonProps>) => {
	return render(<Button {...rest}>{children}</Button>);
};

describe('components/<Button />', () => {
	it('Should render children before label', () => {
		const label = 'Button label';
		renderButton({ label });

		const buttonChild = screen.queryByText(mockLabel);
		const buttonLabel = screen.queryByText(label);
		expect(buttonChild).toBeInTheDocument();
		expect(buttonLabel).not.toBeInTheDocument();
	});

	it('Should render a label when given', () => {
		const label = 'Button label';
		renderButton({ children: null, label });

		const buttonLabel = screen.queryByText(label);
		expect(buttonLabel).toBeInTheDocument();
	});

	it('Should set the correct className', () => {
		const customClass = 'custom-class';
		const customVariants = ['small', 'outline'];
		renderButton({ className: customClass, variants: customVariants });

		const button = screen.queryByText(mockLabel);
		expect(button).toHaveClass('c-button');
		expect(button).toHaveClass(customClass);
		expect(button).toHaveClass(`c-button--${customVariants[0]}`);
		expect(button).toHaveClass(`c-button--${customVariants[1]}`);
	});

	it('Should pass the correct button attributes', () => {
		const ariaLabel = 'label';
		const id = 'button-id';
		const title = 'title';
		const type = 'submit';
		renderButton({ ariaLabel, id, title, type });

		const button = screen.queryByText(mockLabel);
		expect(button).toHaveAttribute('aria-label', ariaLabel);
		expect(button).toHaveAttribute('id', id);
		expect(button).toHaveAttribute('title', title);
		expect(button).toHaveAttribute('type', type);
	});

	it('Should call the onClick handler when clicked', () => {
		const onClick = jest.fn();
		renderButton({ onClick });

		const button = screen.getByText(mockLabel);
		fireEvent.click(button);
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
