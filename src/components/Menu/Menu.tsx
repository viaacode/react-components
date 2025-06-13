import clsx from 'clsx';
import React, { type FC } from 'react';

import { bemCls, getVariantClasses } from '../../utils';

import './Menu.scss';
import type { MenuProps } from './Menu.types';
import MenuContent from './MenuContent/MenuContent';

const Menu: FC<MenuProps> = ({
	className,
	children,
	menuItems = [],
	renderItem,
	noResultsLabel,
	onClick = () => null,
	isOpen = true,
	search,
	style,
	rootClassName: root = 'c-menu',
	variants,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants), 'c-menu--default', {
		[bem('', 'search-result')]: search,
		'c-menu--visible--default': isOpen,
	});

	return (
		<div className={rootCls} style={style}>
			{children || (
				<MenuContent
					menuItems={menuItems}
					onClick={onClick}
					renderItem={renderItem}
					noResultsLabel={noResultsLabel}
					rootClassName={root}
				/>
			)}
		</div>
	);
};

export default Menu;
