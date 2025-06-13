import type { ReactNode } from 'react';

import type { DefaultComponentProps } from '../../types';

import type { MenuItemInfo } from './MenuContent/MenuContent.types';

export interface MenuProps extends DefaultComponentProps {
	children?: React.ReactNode;
	menuItems?: MenuItemInfo[] | MenuItemInfo[][]; // Between arrays, there will be a divider
	renderItem?: (menuItem: MenuItemInfo) => ReactNode; // If you want to render your own item
	noResultsLabel?: string;
	onClick?: (menuItemId: string | number) => void;
	isOpen?: boolean;
	search?: boolean;
}
