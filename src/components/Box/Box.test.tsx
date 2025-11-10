import { render } from '@testing-library/react';
import { loremIpsum } from 'lorem-ipsum';

import Box from './Box.js';

const content = loremIpsum({ count: 10 });

const renderBox = ({ ...rest }) => {
	return render(<Box {...rest}>{content}</Box>);
};

describe('<Box />', () => {
	it('Should set the correct className', () => {
		const className = 'c-box-custom';
		const variants = ['small', 'outline'];

		const { getByText } = renderBox({ className, variants });

		const boxComponent = getByText(content);

		expect(boxComponent).toHaveClass('c-box');
		expect(boxComponent).toHaveClass(className);
		expect(boxComponent).toHaveClass(`c-box--${variants[0]}`);
		expect(boxComponent).toHaveClass(`c-box--${variants[1]}`);
	});

	it('Should correctly pass children', () => {
		const { container } = renderBox({});

		expect(container.children[0].textContent).toEqual(content);
	});
});
