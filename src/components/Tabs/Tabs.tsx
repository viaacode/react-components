import clsx from 'clsx';
import React, { type FC } from 'react';

import { bemCls, getVariantClasses, getVariantsArray } from '../../utils/index.js';

import { Tab } from './Tab/index.js';
import type { TabsProps } from './Tabs.types.js';

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
					variants={[...getVariantsArray(tab.variants), ...getVariantsArray(variants)]}
					{...tab}
					onClick={() => onClick(tab.id)}
				/>
			))}
		</nav>
	);
};

export default Tabs;
