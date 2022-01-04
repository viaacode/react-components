import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Tab from './Tab';
import { TabProps } from './Tab.types';

const mockId = 'tab-id';
const mockLabel = 'Tab me!';

const renderTab = ({ id = mockId, label = mockLabel, ...rest }: Partial<TabProps> = {}) => {
	return render(<Tab {...rest} id={id} label={label} />);
};

describe('<Tab />', () => {
	it('Should render a label', () => {
		const label = 'Tab label';
		renderTab({ label });

		const tabLabel = screen.queryByText(label);
		expect(tabLabel).toBeInTheDocument();
	});

	it('Should render an icon', () => {
		const iconName = 'icon-test';
		renderTab({ icon: <span>{iconName}</span> });

		const icon = screen.queryByText(iconName);
		expect(icon).toBeInTheDocument();
	});

	it('Should be able to be set active', () => {
		renderTab({ active: true });

		const tab = screen.queryByRole('button');
		expect(tab).toHaveClass('c-tab--active');
	});

	it('Should call the onClick handler when clicked', () => {
		const onClick = jest.fn();
		renderTab({ onClick });

		const tab = screen.getByRole('button');
		fireEvent.click(tab);
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it('Should call the onKeyPress handler when a key is pressed', () => {
		const onKeyPress = jest.fn();
		renderTab({ onKeyPress });

		const tab = screen.getByRole('button');
		fireEvent.keyPress(tab, { key: 'Enter', keyCode: 13 });
		expect(onKeyPress).toHaveBeenCalledTimes(1);
	});
});
