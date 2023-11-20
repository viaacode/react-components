import { render } from '@testing-library/react';
import React from 'react';

import Spinner from './Spinner';
import { SpinnerProps } from './Spinner.types';

const renderSpinner = ({ ...rest }: Partial<SpinnerProps>) => {
	return render(<Spinner {...rest} />);
};

describe('components/<Spinner />', () => {
	it('Should set the correct className', () => {
		const className = 'custom-class';
		const { container } = renderSpinner({ className });

		const spinner = container.querySelector('.' + className);
		expect(spinner).toHaveClass(className);
	});
});
