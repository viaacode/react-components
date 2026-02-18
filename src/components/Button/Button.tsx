import clsx from 'clsx';
import { type FC, forwardRef, type MouseEvent, type ReactNode } from 'react';

import { bemCls, getVariantClasses } from '../../utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '../Tooltip';

import type { ButtonProps } from './Button.types';

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
			tooltipText,
			tooltipPosition,
			ariaLabel,
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

		const wrapInTooltip = (element: JSX.Element): JSX.Element => {
			return (
				<Tooltip position={tooltipPosition || 'top'}>
					<TooltipTrigger>{element}</TooltipTrigger>
					<TooltipContent>
						<span>{tooltipText}</span>
					</TooltipContent>
				</Tooltip>
			);
		};

		const element = (
			<button
				{...htmlButtonProps}
				className={rootCls}
				id={id}
				title={title}
				type={type}
				onClick={onButtonClick}
				disabled={disabled}
				ref={ref}
				aria-label={
					ariaLabel || title || tooltipText || (typeof label === 'string' ? label : undefined)
				}
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

		return tooltipText ? wrapInTooltip(element) : element;
	}
);

export default Button;
