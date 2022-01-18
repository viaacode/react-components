import { render, screen } from '@testing-library/react';
import React from 'react';

import FormControl from './FormControl';

describe('<FormControl />', () => {
	it('Should be able to render children', () => {
		const child = '123';
		render(<FormControl>{child}</FormControl>);

		expect(screen.getByText(child)).toBeDefined();
	});

	it('Should be able to render a label', () => {
		const label = '456';
		render(<FormControl label={label} />);

		expect(screen.getByText(label)).toBeDefined();
	});

	it('Should be able to render a label with a suffix', () => {
		const label = '789';
		const suffix = '(optional)';
		render(<FormControl label={label} suffix={suffix} />);

		expect(screen.getByText(new RegExp(label))).toBeDefined();
		expect(screen.getByText(new RegExp(suffix))).toBeDefined();
	});

	it('Should be able to render errors', () => {
		const foo = 'foo';
		const errors = ['bar', <b key={2}>{foo}</b>];
		render(<FormControl errors={errors} />);

		expect(screen.getByText(errors[0] as string)).toBeDefined();
		expect(screen.getByText(foo)).toBeDefined();
	});
});
