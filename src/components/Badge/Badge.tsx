import clsx from 'clsx';
import React, { FunctionComponent } from 'react';

import { getVariantClasses } from '../../utils';

import { BadgeProps } from './Badge.types';

export const Badge: FunctionComponent<BadgeProps> = ({
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
