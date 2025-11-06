import clsx from 'clsx';
import React, { type FC } from 'react';

import { bemCls, getVariantClasses } from '../../utils/index.js';

import type { AvatarProps } from './Avatar.types.js';
import './Avatar.scss';

const Avatar: FC<AvatarProps> = ({
	children,
	className,
	rootClassName: root = 'c-avatar',
	text,
	variants,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants));

	return (
		<div className={rootCls}>
			{children && <div className={bem('image')}>{children}</div>}
			<div className={bem('text')}>{text}</div>
		</div>
	);
};

export default Avatar;
