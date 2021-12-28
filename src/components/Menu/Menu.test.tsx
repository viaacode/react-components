import { fireEvent, render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';

import { documentOf } from '../../helpers/document-of';

import Menu from './Menu';
import {
	menuItems,
	menuItemsWithDivider,
	menuItemsWithIcons,
	menuItemsWithSearch,
} from './Menu.mocks';
import { MenuProps } from './Menu.types';
import { MenuItemInfo } from './MenuContent';
import MenuSearchResultContent from './MenuSearchResultContent/MenuSearchResultContent';
const renderMenu = ({ children = null, ...args }: PropsWithChildren<MenuProps>) => {
	return render(<Menu {...args}>{children}</Menu>);
};

describe('<MenuItem />', () => {
	it('Should be able to render', () => {
		const menu = renderMenu({ menuItems });

		const menuComponent = documentOf(menu).getElementsByClassName('c-menu')[0];
		expect(menuComponent).not.toBeUndefined();
	});

	it('Should set the correct className', () => {
		const className = 'c-menu-custom';

		const menu = renderMenu({ menuItems, className });

		const menuComponent = documentOf(menu).getElementsByClassName('c-menu')[0];

		expect(menuComponent).toHaveClass(className);
		expect(menuComponent).toHaveClass('c-menu--visible--default');
	});

	it('Should render the correct number of menu items', () => {
		const menu = renderMenu({ menuItems });

		const menuComponent = documentOf(menu).getElementsByClassName('c-menu__item');

		expect(menuComponent).toHaveLength(menuItems.length);
	});

	it('should render children when given', () => {
		const children = <div className="c-custom-content">stuff</div>;
		const menu = renderMenu({ children });

		const menuComponent = documentOf(menu).getElementsByClassName('c-custom-content');

		expect(menuComponent).toHaveLength(1);
	});

	it('Should render icons if provided', () => {
		const menu = renderMenu({ menuItems: menuItemsWithIcons });

		const menuComponent = documentOf(menu).getElementsByClassName('o-svg-icon');

		expect(menuComponent).toHaveLength(menuItemsWithIcons.length);
	});

	it('Should render with search results', () => {
		const children = <MenuSearchResultContent menuItems={menuItemsWithSearch} />;
		const menu = renderMenu({ children, search: true });

		const menuComponent = documentOf(menu).getElementsByClassName('c-menu')[0];
		const menuSearchItems = documentOf(menu).getElementsByClassName('c-menu__item');

		expect(menuComponent).toHaveClass('c-menu--search-result');
		expect(menuSearchItems).toHaveLength(menuItemsWithSearch.length);
	});

	it('Should render no results label if provided', () => {
		const noResultsLabel = 'No results';

		const menu = renderMenu({ menuItems: [], noResultsLabel });

		const menuComponent = documentOf(menu).getElementsByClassName('c-menu__label')[0];

		expect(menuComponent.textContent).toEqual(noResultsLabel);
	});

	it('Should render the correct number of dividers', () => {
		const menu = renderMenu({ menuItems: menuItemsWithDivider });

		const menuItems = documentOf(menu).getElementsByClassName('c-menu__item');
		const menuDividers = documentOf(menu).getElementsByClassName('c-menu__divider');

		expect(menuItems).toHaveLength(menuItems.length);
		expect(menuDividers).toHaveLength(menuItemsWithDivider.length - 1);
	});

	it('Should render using custom render function', () => {
		const renderItem = (menuItem: MenuItemInfo) => {
			return (
				<div className="custom-item" key={`menu-search-item-${menuItem.id}`}>
					{menuItem.label}
				</div>
			);
		};
		const menu = renderMenu({ menuItems: menuItemsWithDivider, renderItem });

		const menuCustomItems = documentOf(menu).getElementsByClassName('custom-item');

		expect(menuCustomItems).toHaveLength(menuItems.length);
		expect(menuCustomItems[1].textContent).toEqual(menuItems[1].label);
	});

	it('Should call onClick when item is clicked', () => {
		const onClick = jest.fn();

		const menu = renderMenu({ menuItems, onClick });

		const menuSeconditem = documentOf(menu).getElementsByClassName('c-menu__item')[1];

		fireEvent.click(menuSeconditem);

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalledWith(menuItems[1].id);
	});
});
