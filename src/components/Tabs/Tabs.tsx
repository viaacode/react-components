import clsx from 'clsx';
import type { FC } from 'react';

import { bemCls, getVariantClasses, getVariantsArray } from '../../utils';

import { Tab } from './Tab';
import type { TabsProps } from './Tabs.types';

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
