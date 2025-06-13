import { getAllByText, render } from '@testing-library/react';
import React from 'react';

import { ProgressBar } from './ProgressBar';

describe('<ProgressBar />', () => {
	it('Should render with 0 percentage', () => {
		const percentage = 0;
		const progressBar = render(<ProgressBar percentage={percentage} />);
		const percentageElements = getAllByText(progressBar.container, `${percentage}%`);
		expect(percentageElements).toHaveLength(2);
		expect(percentageElements[0].className).toContain('c-progress-bar__label--dark');
		expect(percentageElements[0].textContent).toContain(`${percentage}%`);
		expect(percentageElements[1].className).toContain('c-progress-bar__label--light');
		expect(percentageElements[1].textContent).toContain(`${percentage}%`);
	});

	it('Should render with 50 percentage', () => {
		const percentage = 50;
		const progressBar = render(<ProgressBar percentage={percentage} />);
		const percentageElements = getAllByText(progressBar.container, `${percentage}%`);
		expect(percentageElements).toHaveLength(2);
		expect(percentageElements[0].className).toContain('c-progress-bar__label--dark');
		expect(percentageElements[0].textContent).toContain(`${percentage}%`);
		expect(percentageElements[1].className).toContain('c-progress-bar__label--light');
		expect(percentageElements[1].textContent).toContain(`${percentage}%`);
	});

	it('Should render with 100 percentage', () => {
		const percentage = 100;
		const progressBar = render(<ProgressBar percentage={percentage} />);
		const percentageElements = getAllByText(progressBar.container, `${percentage}%`);
		expect(percentageElements).toHaveLength(2);
		expect(percentageElements[0].className).toContain('c-progress-bar__label--dark');
		expect(percentageElements[0].textContent).toContain(`${percentage}%`);
		expect(percentageElements[1].className).toContain('c-progress-bar__label--light');
		expect(percentageElements[1].textContent).toContain(`${percentage}%`);
	});
});
