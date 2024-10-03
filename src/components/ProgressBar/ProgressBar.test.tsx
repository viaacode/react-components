import { render } from '@testing-library/react';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';

import ProgressBar from './ProgressBar';

const content = loremIpsum({ count: 10 });

const renderProgressBar = ({ ...rest }) => {
	return render(<ProgressBar {...rest}>{content}</ProgressBar>);
};

describe('<ProgressBar />', () => {
	it('Should set the correct className', () => {
		const className = 'c-box-custom';
		const variants = ['small', 'outline'];

		const { getByText } = renderProgressBar({ className, variants });

		const boxComponent = getByText(content);

		expect(boxComponent).toHaveClass('c-box');
		expect(boxComponent).toHaveClass(className);
		expect(boxComponent).toHaveClass(`c-box--${variants[0]}`);
		expect(boxComponent).toHaveClass(`c-box--${variants[1]}`);
	});

	it('Should correctly pass children', () => {
		const { container } = renderProgressBar({});

		expect(container.children[0].textContent).toEqual(content);
	});
});
