import type { ReactNode } from 'react';

export interface MenuItemInfoSchema {
	label: string;
	id: string | number;
	key?: string; // Defaults to id
	icon?: ReactNode;
}

export interface MoreOptionsDropdownPropsSchema {
	id: string;
	children?: ReactNode;
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	menuItems: MenuItemInfoSchema[] | MenuItemInfoSchema[][];
	label?: string;
	onOptionClicked?: (menuItemId: string | number) => void;
	icon?: ReactNode;
}
