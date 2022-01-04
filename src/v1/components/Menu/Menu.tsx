import classnames from 'classnames';
import React, { CSSProperties, FunctionComponent, ReactNode } from 'react';

import { DefaultProps } from '../../types';

import { MenuContent, MenuItemInfoSchema } from './MenuContent/MenuContent';

export interface MenuPropsSchema extends DefaultProps {
	menuItems?: MenuItemInfoSchema[] | MenuItemInfoSchema[][]; // Between arrays, there will be a divider
	renderItem?: (menuItem: MenuItemInfoSchema) => ReactNode; // If you want to render your own item
	noResultsLabel?: string;
	onClick?: (menuItemId: string | number) => void;
	isOpen?: boolean;
	search?: boolean;
	style?: CSSProperties;
}

export const Menu: FunctionComponent<MenuPropsSchema> = ({
	className,
	children,
	menuItems = [],
	renderItem,
	noResultsLabel,
	onClick = () => null,
	isOpen = true,
	search,
	style,
}) => {
	return (
		<div
			className={classnames(className, 'c-menu', {
				'c-menu--search-result': search,
				'c-menu--visible': isOpen,
			})}
			style={style}
		>
			{children ? (
				children
			) : (
				<MenuContent
					menuItems={menuItems}
					onClick={onClick}
					renderItem={renderItem}
					noResultsLabel={noResultsLabel}
				/>
			)}
		</div>
	);
};
