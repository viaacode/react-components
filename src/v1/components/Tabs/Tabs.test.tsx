import { shallow } from 'enzyme';
import React from 'react';

import { Tab } from './Tab/Tab';
import { Tabs } from './Tabs';

const mockTabs = [
	{
		label: 'Videos',
		id: 'videos',
		active: true,
	},
	{
		label: 'Folder',
		id: 'folder',
	},
];

describe('<Tabs />', () => {
	it('Should be able to render', () => {
		shallow(<Tabs tabs={mockTabs} />);
	});

	it('Should set the correct className', () => {
		const customClass = 'c-column-custom';

		const tabsComponent = shallow(<Tabs className={customClass} tabs={mockTabs} />);

		expect(tabsComponent.hasClass(customClass)).toEqual(true);
		expect(tabsComponent.hasClass('c-tabs')).toEqual(true);
	});

	it('Should set the correct className when border is passed', () => {
		const tabsComponent1 = shallow(<Tabs tabs={mockTabs} border />);
		const tabsComponent2 = shallow(<Tabs tabs={mockTabs} />);

		expect(tabsComponent1.hasClass('c-tabs__bottom-border')).toEqual(true);
		expect(tabsComponent2.hasClass('c-tabs__bottom-border')).toEqual(false);
	});

	it('Should correctly render `Tab`-components as children', () => {
		const tabsComponent = shallow(<Tabs tabs={mockTabs} />);

		const tabElement = tabsComponent.find(Tab);

		expect(tabElement).toHaveLength(2);
	});

	it('Should trigger onClick when clicking a tab', () => {
		const onClickHandler = jest.fn();

		const tabsComponent = shallow(<Tabs tabs={mockTabs} onClick={onClickHandler} />);

		const tabElement = tabsComponent.find(Tab);

		tabElement.at(0).simulate('click');

		expect(onClickHandler).toBeCalled();
		expect(onClickHandler).toBeCalledTimes(1);
		expect(onClickHandler).toBeCalledWith(mockTabs[0].id);

		tabElement.at(1).simulate('click');

		expect(onClickHandler).toBeCalledTimes(2);
		expect(onClickHandler).toBeCalledWith(mockTabs[1].id);
	});
});
