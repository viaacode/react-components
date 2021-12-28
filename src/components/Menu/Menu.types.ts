import { CSSProperties, ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

import { MenuItemInfo } from './MenuContent/MenuContent.types';

export interface MenuProps extends DefaultComponentProps {
	menuItems?: MenuItemInfo[] | MenuItemInfo[][]; // Between arrays, there will be a divider
	renderItem?: (menuItem: MenuItemInfo) => ReactNode; // If you want to render your own item
	noResultsLabel?: string;
	onClick?: (menuItemId: string | number) => void;
	isOpen?: boolean;
	search?: boolean;
	style?: CSSProperties;
}
