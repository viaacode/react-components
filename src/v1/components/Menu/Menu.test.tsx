import { mount, shallow } from 'enzyme';
import React from 'react';

import { Menu } from './Menu';
import { MenuItemInfoSchema } from './MenuContent/MenuContent';
import { MenuSearchResultContent } from './MenuSearchResultContent/MenuSearchResultContent';
import {
	menuItems,
	menuItemsWithDivider,
	menuItemsWithIcons,
	menuItemsWithSearch,
} from './__mocks__';

describe('<MenuItem />', () => {
	it('Should be able to render', () => {
		shallow(<Menu menuItems={menuItems} />);
	});

	it('Should set the correct className', () => {
		const customClass = 'c-menu-custom';

		const menuComponent = shallow(<Menu className={customClass} menuItems={menuItems} />);

		expect(menuComponent.hasClass(customClass)).toEqual(true);
		expect(menuComponent.hasClass('c-menu')).toEqual(true);
		expect(menuComponent.hasClass('c-menu--visible')).toEqual(true);
	});

	it('Should render the correct number of menu items', () => {
		const menuComponent = mount(<Menu menuItems={menuItems} />);

		expect(menuComponent.find('.c-menu__item')).toHaveLength(menuItems.length);
	});

	it('should render children when given', () => {
		const menuComponent = mount(
			<Menu>
				<div className="c-custom-content">stuff</div>
			</Menu>
		);

		expect(menuComponent.find('.c-custom-content')).toHaveLength(1);
	});

	it('Should render icons if provided', () => {
		const menuComponent = mount(<Menu menuItems={menuItemsWithIcons} />);

		expect(menuComponent.find('.o-svg-icon')).toHaveLength(menuItemsWithIcons.length);
	});

	it('Should render with search results', () => {
		const menuSearchComponent = mount(
			<Menu search>
				<MenuSearchResultContent menuItems={menuItemsWithSearch} />
			</Menu>
		);

		expect(menuSearchComponent.find('.c-menu').hasClass('c-menu--search-result')).toBeTruthy();
		expect(menuSearchComponent.find('.c-menu__item')).toHaveLength(menuItemsWithSearch.length);
	});

	it('Should render no results label if provided', () => {
		const noResultsLabel = 'No results';
		const menuComponent = mount(<Menu menuItems={[]} noResultsLabel={noResultsLabel} />);

		expect(menuComponent.find('.c-menu__label').text()).toEqual(noResultsLabel);
	});

	it('Should render the correct number of dividers', () => {
		const menuComponent = mount(<Menu menuItems={menuItemsWithDivider} />);

		expect(menuComponent.find('.c-menu__item')).toHaveLength(menuItems.length);
		expect(menuComponent.find('.c-menu__divider')).toHaveLength(
			menuItemsWithDivider.length - 1
		);
	});

	it('Should render using custom render function', () => {
		const customRenderFunction = (menuItem: MenuItemInfoSchema) => {
			return (
				<div className="custom-item" key={`menu-search-item-${menuItem.id}`}>
					{menuItem.label}
				</div>
			);
		};

		const menuComponent = mount(
			<Menu menuItems={menuItemsWithDivider} renderItem={customRenderFunction} />
		);

		expect(menuComponent.find('.custom-item')).toHaveLength(menuItems.length);
		expect(menuComponent.find('.custom-item').at(1).text()).toEqual(menuItems[1].label);
	});

	it('Should call onClick when item is clicked', () => {
		const onClickHandler = jest.fn();

		const menuComponent = mount(<Menu menuItems={menuItems} onClick={onClickHandler} />);

		const secondItem = menuComponent.find('.c-menu__item').at(1);
		secondItem.simulate('click');

		expect(onClickHandler).toHaveBeenCalled();
		expect(onClickHandler).toHaveBeenCalledTimes(1);
		expect(onClickHandler).toHaveBeenCalledWith(menuItems[1].id);
	});
});
