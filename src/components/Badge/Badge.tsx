import clsx from 'clsx';
import React, { type FC } from 'react';

import { getVariantClasses } from '../../utils';

import type { BadgeProps } from './Badge.types';

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
