import type { ReactNode } from 'react';

import type { DefaultComponentProps } from '../../../types/index';

export interface MenuItemInfo {
	label: string;
	id: string | number;
	key?: string; // Defaults to id
	iconStart?: ReactNode;
	iconEnd?: ReactNode;
}

export interface MenuContentProps extends DefaultComponentProps {
	children?: React.ReactNode;
	menuItems: MenuItemInfo[] | MenuItemInfo[][]; // Between arrays, there will be a divider
	renderItem?: (menuItem: MenuItemInfo) => ReactNode; // If you want to render your own item
	noResultsLabel?: string;
	onClick?: (menuItemId: string | number) => void;
}
