import { render, screen } from '@testing-library/react';
import React from 'react';

import Badge from './Badge';
import { BadgeProps } from './Badge.types';

const renderBadge = ({ text = 'text', ...rest }: BadgeProps) => {
	return render(<Badge text={text} {...rest} />);
};

describe('<Badge />', () => {
	it('Should be able to render', () => {
		const text = 'badge-label';
		const { getByText } = renderBadge({ text });

		const badge = getByText(text);

		expect(badge).toBeInTheDocument();
	});

	it('Should render the text correctly', () => {
		const text = 'this is a badge';
		const { container } = renderBadge({ text });

		const badge = container.firstChild;

		expect(badge?.textContent).toEqual(text);
	});

	it('Should render a react node correctly', () => {
		const mockLabel = 'label';
		const mockClass = 'class';
		const text = <span className={mockClass}>{mockLabel}</span>;
		const { getByText } = renderBadge({ text });

		const component = getByText(mockLabel);

		expect(component).toBeInTheDocument;
		expect(component).toHaveClass(mockClass);
	});

	it('Should set the correct className', () => {
		const text = 'badge-label';
		const className = 'c-badge-custom';
		const variants = ['success', 'error'];
		const { getByText } = renderBadge({ text, className, variants });

		const badge = getByText(text);

		expect(badge).toHaveClass('c-badge');
		expect(badge).toHaveClass(className);
		expect(badge).toHaveClass(`c-badge--${variants[0]}`);
		expect(badge).toHaveClass(`c-badge--${variants[1]}`);
	});

	it('Should set the correct className for every type', () => {
		const defaultText = 'default';
		const successText = 'success';
		const errorText = 'error';

		renderBadge({ text: defaultText });
		renderBadge({ text: successText, type: 'success' });
		renderBadge({ text: errorText, type: 'error' });

		const defaultBadge = screen.getByText(defaultText);
		const successBadge = screen.getByText(successText);
		const errorBadge = screen.getByText(errorText);

		expect(defaultBadge).toHaveClass('c-badge--default');
		expect(successBadge).toHaveClass('c-badge--success');
		expect(errorBadge).toHaveClass('c-badge--error');
	});
});
