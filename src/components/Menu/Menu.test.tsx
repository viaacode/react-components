import { fireEvent, render } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import {
	menuItems,
	menuItemsWithDivider,
	menuItemsWithIcons,
	menuItemsWithSearch,
} from './__mocks__/menu';
import Menu from './Menu';
import type { MenuProps } from './Menu.types';
import type { MenuItemInfo } from './MenuContent/index';
import { MenuSearchResultContent } from './MenuSearchResultContent/index';

const renderMenu = ({ children = null, ...args }: PropsWithChildren<MenuProps>) => {
	return render(<Menu {...args}>{children}</Menu>);
};

describe('<MenuItem />', () => {
	it('Should be able to render', () => {
		const { container } = renderMenu({ menuItems });

		const menuComponent = container.querySelector('.c-menu');
		expect(menuComponent).toBeInTheDocument();
	});

	it('Should set the correct className', () => {
		const className = 'c-menu-custom';

		const { container } = renderMenu({ menuItems, className });

		const menuComponent = container.querySelector('.c-menu');

		expect(menuComponent).toHaveClass(className);
		expect(menuComponent).toHaveClass('c-menu--visible--default');
	});

	it('Should render the correct number of menu items', () => {
		const { container } = renderMenu({ menuItems });

		const menuComponent = container.querySelectorAll('.c-menu__item');

		expect(menuComponent).toHaveLength(menuItems.length);
	});

	it('should render children when given', () => {
		const children = <div className="c-custom-content">stuff</div>;
		const { container } = renderMenu({ children });

		const menuComponent = container.querySelector('.c-custom-content');

		expect(menuComponent).toBeInTheDocument;
	});

	it('Should render icons if provided', () => {
		const { container } = renderMenu({ menuItems: menuItemsWithIcons });

		const menuComponent = container.querySelectorAll('.o-svg-icon');

		expect(menuComponent).toHaveLength(menuItemsWithIcons.length);
	});

	it('Should render with search results', () => {
		const children = <MenuSearchResultContent menuItems={menuItemsWithSearch} />;
		const { container } = renderMenu({ children, search: true });

		const menuComponent = container.querySelector('.c-menu');
		const menuSearchItems = container.querySelectorAll('.c-menu__item');

		expect(menuComponent).toHaveClass('c-menu--search-result');
		expect(menuSearchItems).toHaveLength(menuItemsWithSearch.length);
	});

	it('Should render no results label if provided', () => {
		const noResultsLabel = 'No results';

		const { container } = renderMenu({ menuItems: [], noResultsLabel });

		const menuComponent = container.querySelector('.c-menu__label');

		expect(menuComponent?.textContent).toEqual(noResultsLabel);
	});

	it('Should render the correct number of dividers', () => {
		const { container } = renderMenu({ menuItems: menuItemsWithDivider });

		const menuItems = container.querySelectorAll('.c-menu__item');
		const menuDividers = container.querySelectorAll('.c-menu__divider');

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
		const { container } = renderMenu({ menuItems: menuItemsWithDivider, renderItem });

		const menuCustomItems = container.querySelectorAll('.custom-item');

		expect(menuCustomItems).toHaveLength(menuItems.length);
		expect(menuCustomItems[1].textContent).toEqual(menuItems[1].label);
	});

	it('Should call onClick when item is clicked', () => {
		const onClick = jest.fn();

		const { container } = renderMenu({ menuItems, onClick });

		const menuSeconditem = container.querySelectorAll('.c-menu__item')[1];

		fireEvent.click(menuSeconditem);

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalledWith(menuItems[1].id);
	});
});
