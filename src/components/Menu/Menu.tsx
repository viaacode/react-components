import clsx from 'clsx';
import React, { FunctionComponent } from 'react';

import { bemCls, getVariantClasses } from '../../utils';

import './Menu.scss';
import { MenuProps } from './Menu.types';
import MenuContent from './MenuContent/MenuContent';

const Menu: FunctionComponent<MenuProps> = ({
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
	const rootCls = clsx(className, root, getVariantClasses(root, variants), {
		[bem('', 'search-result')]: search,
	});

	return (
		<div
			className={clsx(rootCls, 'c-menu--default', { 'c-menu--visible--default': isOpen })}
			style={style}
		>
			{children || (
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

export default Menu;
