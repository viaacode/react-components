import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../../types';

export interface MenuItemInfo {
	label: string;
	id: string | number;
	icon?: ReactNode;
	key?: string;
}

export interface MenuContentProps extends DefaultComponentProps {
	menuItems: MenuItemInfo[] | MenuItemInfo[][]; // Between arrays, there will be a divider
	renderItem?: (menuItem: MenuItemInfo) => ReactNode; // If you want to render your own item
	noResultsLabel?: string;
	onClick?: (menuItemId: string | number) => void;
}
