import clsx from 'clsx';
import { type FC, Fragment, type ReactNode } from 'react';

import { bemCls, getVariantClasses } from '../../../utils/index';

import type { MenuContentProps, MenuItemInfo } from './MenuContent.types';

import './MenuContent.scss';

const MenuContent: FC<MenuContentProps> = ({
	className,
	menuItems,
	renderItem,
	noResultsLabel,
	onClick = () => null,
	rootClassName: root = 'c-menu',
	variants,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(
		className,
		bem('item'),
		getVariantClasses(root, variants),
		'c-menu-content-item'
	);

	const renderMenuItem = (menuItemInfo: MenuItemInfo, index: number) => {
		if (renderItem) {
			return renderItem(menuItemInfo);
		}
		return (
			<button
				type="button"
				className={rootCls}
				onClick={() => onClick(menuItemInfo.id)}
				tabIndex={0}
				key={`menu-item-${menuItemInfo.key ?? menuItemInfo.id ?? index}`}
			>
				<div className={bem('label')}>
					{menuItemInfo.iconStart && menuItemInfo.iconStart}
					{menuItemInfo.label}
					{menuItemInfo.iconEnd && menuItemInfo.iconEnd}
				</div>
			</button>
		);
	};

	const renderMenuItems = (menuItems: MenuItemInfo[]) => {
		return menuItems.map(renderMenuItem);
	};

	const renderMenuItemArrays = (menuItemArrays: MenuItemInfo[] | MenuItemInfo[][]): ReactNode => {
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
											.map((mi) => mi.key ?? mi.id ?? index)
											.join('-')}`}
									>
										{renderMenuItems(menuItems)}
										<div className={bem('divider')} />
									</Fragment>
								);
							}
							return (
								<Fragment
									key={`menu-item-group-${menuItems
										.map((mi) => mi.key ?? mi.id ?? index)
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
				<div className={bem('item')} key="menu-item-no-results">
					<div className={bem('label')}>{noResultsLabel}</div>
				</div>
			);
		}
		return null;
	};

	return renderMenuItemArrays(menuItems);
};

export default MenuContent;
