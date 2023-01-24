import clsx from 'clsx';
import React, { FC } from 'react';

import { bemCls, getVariantClasses } from '../../utils';

import { AlertProps } from './Alert.types';

const Alert: FC<AlertProps> = ({
	title,
	icon,
	content,
	className,
	rootClassName: root = 'c-Alert',
	variants,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants));

	return (
		<div className={rootCls}>
			{icon && <div className={bem('icon')}>{icon}</div>}
			<div className={bem('message')}>
				{title && <p className={bem('title')}>{title}</p>}
				<div className={bem('content')}>{content}</div>
			</div>
		</div>
	);
};

export default Alert;
