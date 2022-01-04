import clsx from 'clsx';
import React, { FC } from 'react';

import { bemCls, getVariantClasses } from '../../utils';

import { Tab } from './Tab';
import { TabsProps } from './Tabs.types';

const Tabs: FC<TabsProps> = ({
	className,
	rootClassName: root = 'c-tabs',
	tabs,
	variants,
	onClick = () => null,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants));

	return (
		<nav className={rootCls}>
			{tabs.map((tab) => (
				<Tab
					key={tab.id}
					className={bem('item')}
					{...tab}
					onClick={() => onClick(tab.id)}
				/>
			))}
		</nav>
	);
};

export default Tabs;
