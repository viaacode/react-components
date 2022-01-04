import classnames from 'classnames';
import React, { FC, Fragment, ReactNode } from 'react';

import { MenuContentProps, MenuItemInfo } from './MenuContent.types';

const MenuContent: FC<MenuContentProps> = ({
	className,
	menuItems,
	renderItem,
	noResultsLabel,
	onClick = () => null,
}) => {
	const renderIcon = (iconNode: ReactNode | string) => <span>{iconNode}</span>;

	const renderMenuItem = (menuItemInfo: MenuItemInfo) => {
		if (renderItem) {
			return renderItem(menuItemInfo);
		}
		return (
			<div
				className={classnames(className, 'c-menu__item')}
				onClick={() => onClick(menuItemInfo.id)}
				onKeyPress={(e) => (e.key === 'Space' ? onClick(menuItemInfo.id) : () => null)}
				role="menuitem"
				tabIndex={0}
				key={`menu-item-${menuItemInfo.id}`}
			>
				<div className="c-menu__label">
					{menuItemInfo.icon && renderIcon(menuItemInfo.icon)}
					{menuItemInfo.label}
				</div>
			</div>
		);
	};

	const renderMenuItems = (menuItems: MenuItemInfo[]) => {
		return menuItems.map(renderMenuItem);
	};

	const renderMenuItemArrays = (menuItemArrays: MenuItemInfo[] | MenuItemInfo[][]) => {
		if (menuItems.length) {
			if (Array.isArray(menuItemArrays[0])) {
				// Array of arrays with dividers in between
				return (
					<Fragment>
						{(menuItemArrays as MenuItemInfo[][]).map((menuItems, index) => {
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
				<Fragment key={(menuItemArrays as MenuItemInfo[]).map((mi) => mi.id).join('-')}>
					{renderMenuItems(menuItems as MenuItemInfo[])}
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

export default MenuContent;
