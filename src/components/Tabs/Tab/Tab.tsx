import clsx from 'clsx';
import React, { type FC } from 'react';

import { bemCls, getVariantClasses } from '../../../utils';

import './Tab.scss';
import type { TabProps } from './Tab.types';

const Tab: FC<TabProps> = ({
	active,
	className,
	label,
	icon,
	id,
	rootClassName: root = 'c-tab',
	variants,
	onClick = () => null,
	onKeyPress = () => null,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants), bem('', String(id)), {
		[bem('', 'active')]: active,
	});

	return (
		<button
			type="button"
			className={rootCls}
			tabIndex={0}
			onClick={onClick}
			onKeyPress={onKeyPress}
		>
			{icon && <span className={bem('icon')}>{icon}</span>}
			<span className={bem('label')}>{label}</span>
		</button>
	);
};

export default Tab;
