import clsx from 'clsx';
import React, { type FC } from 'react';

import { bemCls, getVariantClasses } from '../../../utils/index.js';
import { MenuContent } from '../MenuContent/index.js';

import type {
	MenuSearchResultContentProps,
	MenuSearchResultItemInfo,
} from './MenuSearchResultContent.types.js';

const MenuSearchResultContent: FC<MenuSearchResultContentProps> = ({
	className,
	menuItems,
	noResultsLabel,
	onClick = () => null,
	rootClassName: root = 'c-menu',
	variants,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, bem('item'), getVariantClasses(root, variants), {});

	const renderMenuItem = (menuItemInfo: MenuSearchResultItemInfo) => {
		return (
			<div
				className={rootCls}
				onClick={() => onClick(menuItemInfo.id)}
				onKeyPress={(e) => (e.key === 'Space' ? onClick(menuItemInfo.id) : () => null)}
				role="button"
				tabIndex={0}
				key={`menu-search-item-${menuItemInfo.id}`}
			>
				<div className={bem('label')}>
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
			rootClassName={root}
		/>
	);
};

export default MenuSearchResultContent;
