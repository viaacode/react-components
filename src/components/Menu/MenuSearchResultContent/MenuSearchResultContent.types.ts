import type { ReactNode } from 'react';

import type { DefaultComponentProps } from '../../../types/index';

export interface MenuSearchResultItemInfo {
	label: string;
	id: string | number;
	type: string;
	icon: ReactNode;
}

export interface MenuSearchResultContentProps extends DefaultComponentProps {
	children?: React.ReactNode;
	menuItems: MenuSearchResultItemInfo[];
	noResultsLabel?: string;
	onClick?: (menuItemId: string | number) => void;
}
