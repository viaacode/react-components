import clsx from 'clsx';
import React, { FC } from 'react';

import { getVariantClasses } from '../../utils';

import { BadgeProps } from './Badge.types';

const Badge: FC<BadgeProps> = ({
	className,
	text,
	type = 'default',
	rootClassName: root = 'c-badge',
	variants,
}) => {
	const rootCls = clsx(className, root, getVariantClasses(root, variants), {
		[`c-badge--${type}`]: type,
	});

	return <div className={rootCls}>{text}</div>;
};

export default Badge;
