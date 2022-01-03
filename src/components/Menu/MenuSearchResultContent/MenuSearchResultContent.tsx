import clsx from 'clsx';
import React, { FunctionComponent } from 'react';

import { getVariantClasses } from '../../../utils/variant-classes';
import { Icon } from '../../../v1/components/Icon/Icon';
import { CATEGORY_TO_ICON } from '../../../v1/components/Thumbnail/Thumbnail';
import { EnglishContentType } from '../../../v1/types';
import MenuContent from '../MenuContent/MenuContent';

import {
	MenuSearchResultContentProps,
	MenuSearchResultItemInfo,
} from './MenuSearchResultContent.types';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const CONTENT_TYPE_TO_LABEL: { [contentType in EnglishContentType]?: string } = {
	/* eslint-enable @typescript-eslint/no-unused-vars */
	collection: 'Collectie',
	video: 'Video',
	audio: 'Audio',
	bundle: 'Bundel',
	search: 'Zoekopdracht',
};

const MenuSearchResultContent: FunctionComponent<MenuSearchResultContentProps> = ({
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
