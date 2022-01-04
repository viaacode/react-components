import clsx from 'clsx';
import React, { FC } from 'react';

import { getVariantClasses } from '../../../utils';
import { MenuContent } from '../MenuContent';

import {
	MenuSearchResultContentProps,
	MenuSearchResultItemInfo,
} from './MenuSearchResultContent.types';

const MenuSearchResultContent: FC<MenuSearchResultContentProps> = ({
	className,
	menuItems,
	noResultsLabel,
	onClick = () => null,
	rootClassName: root = 'c-menu__item',
	variants,
}) => {
	const rootCls = clsx(className, root, getVariantClasses(root, variants), {});

	const renderMenuItem = (menuItemInfo: MenuSearchResultItemInfo) => {
		return (
			<div
				className={rootCls}
				onClick={() => onClick(menuItemInfo.id)}
				onKeyPress={(e) => (e.key === 'Space' ? onClick(menuItemInfo.id) : () => null)}
				role="menuitem"
				tabIndex={0}
				key={`menu-search-item-${menuItemInfo.id}`}
			>
				<div className="c-menu__label">
					<div className={`c-content-type c-content-type--${menuItemInfo.type}`}>
						{menuItemInfo.icon}
						{menuItemInfo.label}
					</div>
				</div>
				<div className="c-content-type">
					<p>{menuItemInfo.type}</p>
				</div>
			</div>
		);
	};

	return (
		<MenuContent
			menuItems={menuItems}
			onClick={onClick}
			renderItem={renderMenuItem as any}
			noResultsLabel={noResultsLabel}
		/>
	);
};

export default MenuSearchResultContent;
