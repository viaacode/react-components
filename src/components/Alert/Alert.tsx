import clsx from 'clsx';
import type { FC } from 'react';

import { bemCls, getVariantClasses } from '../../utils';
import { Button } from '../Button';

import type { AlertProps } from './Alert.types';

const Alert: FC<AlertProps> = ({
	id,
	title,
	icon,
	content,
	closeIcon,
	onClose,
	closeButtonLabel,
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
			{closeIcon && (
				<Button
					variants="text"
					className={bem('close-icon')}
					onClick={() => onClose?.(id)}
					ariaLabel={closeButtonLabel}
				>
					{closeIcon}
				</Button>
			)}
		</div>
	);
};

export default Alert;
