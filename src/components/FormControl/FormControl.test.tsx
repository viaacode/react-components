import { render, screen } from '@testing-library/react';
import React from 'react';

import FormControl from './FormControl';

describe('<FormControl />', () => {
	it('Should be able to render', () => {
		const child = '123';
		render(<FormControl>{child}</FormControl>);

		expect(screen.getByText(child)).toBeDefined();
	});
});
