import clsx from 'clsx';
import React, { FC, forwardRef, MouseEvent, ReactNode } from 'react';

import { bemCls, getVariantClasses } from '../../utils';

import { ButtonProps } from './Button.types';

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className,
			disabled = false,
			icon,
			iconStart = null,
			iconEnd = null,
			id,
			label,
			rootClassName: root = 'c-button',
			title,
			type = 'button',
			variants,
			onClick,
			...htmlButtonProps
		},
		ref
	) => {
		const bem = bemCls.bind(root);
		const rootCls = clsx(className, root, getVariantClasses(root, variants), {
			[bem('', 'disabled')]: disabled,
			[bem('', 'icon')]: icon,
		});

		const onButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
			if (!disabled && typeof onClick === 'function') {
				onClick(event);
			}
		};

		const renderIcon = (iconNode: ReactNode, side?: 'start' | 'end') => (
			<span
				className={clsx(bem('icon'), {
					[bem('icon', side)]: side,
				})}
			>
				{iconNode}
			</span>
		);

		return (
			<button
				{...htmlButtonProps}
				className={rootCls}
				id={id}
				title={title}
				type={type}
				onClick={onButtonClick}
				disabled={disabled}
				ref={ref}
			>
				<div className={bem('content')}>
					{icon ? (
						renderIcon(icon)
					) : (
						<>
							{iconStart && renderIcon(iconStart, 'start')}
							{children ?? <span className={bem('label')}>{label}</span>}
							{iconEnd && renderIcon(iconEnd, 'end')}
						</>
					)}
				</div>
			</button>
		);
	}
);

export default Button;
