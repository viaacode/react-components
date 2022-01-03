import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../../types';

export interface MenuSearchResultItemInfo {
	label: string;
	id: string | number;
	type: string;
	icon: ReactNode;
}

export interface MenuSearchResultContentProps extends DefaultComponentProps {
	menuItems: MenuSearchResultItemInfo[];
	noResultsLabel?: string;
	onClick?: (menuItemId: string | number) => void;
}
