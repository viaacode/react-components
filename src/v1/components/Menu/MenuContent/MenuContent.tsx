import classnames from 'classnames';
import React, { Fragment, FunctionComponent, ReactNode } from 'react';

import { DefaultProps } from '../../../types';
import { Icon } from '../../Icon/Icon';
import { IconNameSchema } from '../../Icon/Icon.types';

import './MenuContent.scss';

export interface MenuItemInfoSchema {
	label: string;
	id: string | number;
	icon?: IconNameSchema;
}

export interface MenuContentPropsSchema extends DefaultProps {
	menuItems: MenuItemInfoSchema[] | MenuItemInfoSchema[][]; // Between arrays, there will be a divider
	renderItem?: (menuItem: MenuItemInfoSchema) => ReactNode; // If you want to render your own item
	noResultsLabel?: string;
	onClick?: (menuItemId: string | number) => void;
}

export const MenuContent: FunctionComponent<MenuContentPropsSchema> = ({
	className,
	menuItems,
	renderItem,
	noResultsLabel,
	onClick = () => null,
}) => {
	const renderMenuItem = (menuItemInfo: MenuItemInfoSchema) => {
		if (renderItem) {
			return renderItem(menuItemInfo);
		}
		return (
			<div
				className={classnames(className, 'c-menu__item')}
				onClick={() => onClick(menuItemInfo.id)}
				key={`menu-item-${menuItemInfo.id}`}
			>
				<div className="c-menu__label">
					{menuItemInfo.icon && <Icon name={menuItemInfo.icon} />}
					{menuItemInfo.label}
				</div>
			</div>
		);
	};

	const renderMenuItems = (menuItems: MenuItemInfoSchema[]) => {
		return menuItems.map(renderMenuItem);
	};

	const renderMenuItemArrays = (
		menuItemArrays: MenuItemInfoSchema[] | MenuItemInfoSchema[][]
	) => {
		if (menuItems.length) {
			if (Array.isArray(menuItemArrays[0])) {
				// Array of arrays with dividers in between
				return (
					<Fragment>
						{(menuItemArrays as MenuItemInfoSchema[][]).map((menuItems, index) => {
							if (index < menuItemArrays.length - 1) {
								return (
									<Fragment
										key={`menu-item-group-${menuItems
											.map((mi) => mi.id)
											.join('-')}`}
									>
										{renderMenuItems(menuItems)}
										<div className="c-menu__divider" />
									</Fragment>
								);
							}
							return (
								<Fragment
									key={`menu-item-group-${menuItems
										.map((mi) => mi.id)
										.join('-')}`}
								>
									{renderMenuItems(menuItems)}
								</Fragment>
							);
						})}
					</Fragment>
				);
			}
			// Regular list of menuItems
			return (
				<Fragment
					key={(menuItemArrays as MenuItemInfoSchema[]).map((mi) => mi.id).join('-')}
				>
					{renderMenuItems(menuItems as MenuItemInfoSchema[])}
				</Fragment>
			);
		}
		if (noResultsLabel) {
			return (
				<div className="c-menu__item" key={`menu-item-no-results`}>
					<div className="c-menu__label">{noResultsLabel}</div>
				</div>
			);
		}
		return <Fragment />;
	};

	return <Fragment>{renderMenuItemArrays(menuItems)}</Fragment>;
};
