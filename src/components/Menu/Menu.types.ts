import { CSSProperties, ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

import { MenuItemInfoSchema } from './MenuContent/MenuContent';

export interface MenuProps extends DefaultComponentProps {
	menuItems?: MenuItemInfoSchema[] | MenuItemInfoSchema[][]; // Between arrays, there will be a divider
	renderItem?: (menuItem: MenuItemInfoSchema) => ReactNode; // If you want to render your own item
	noResultsLabel?: string;
	onClick?: (menuItemId: string | number) => void;
	isOpen?: boolean;
	search?: boolean;
	style?: CSSProperties;
}
