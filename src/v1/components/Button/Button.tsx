import classnames from 'classnames';
import React, { FunctionComponent, MouseEvent, ReactNode } from 'react';

import { DefaultProps } from '../../types';
import { Icon } from '../Icon/Icon';
import { IconNameSchema, IconTypeSchema } from '../Icon/Icon.types';
import { Tooltip } from '../Tooltip/Tooltip';
import { TooltipContent, TooltipTrigger } from '../Tooltip/Tooltip.slots';

import { ButtonTypeSchema } from './Button.types';

export interface ButtonPropsSchema extends DefaultProps {
	active?: boolean;
	ariaLabel?: string;
	arrow?: boolean;
	autoHeight?: boolean;
	block?: boolean;
	children?: ReactNode;
	disabled?: boolean;
	icon?: IconNameSchema;
	iconType?: IconTypeSchema;
	label?: string;

	onClick?(event: MouseEvent<HTMLElement>): void;

	size?: 'small' | 'large';
	title?: string;
	altTitle?: string;
	tooltip?: string;
	type?: ButtonTypeSchema;
	id?: string;
}

const Button: FunctionComponent<ButtonPropsSchema> = ({
	active,
	ariaLabel,
	arrow,
	autoHeight = false,
	block = false,
	children,
	className,
	disabled,
	icon,
	label,
	onClick,
	size,
	title,
	tooltip,
	iconType,
	type = 'primary',
	id,
}) => {
	const handleButtonClick = (evt: MouseEvent<HTMLElement>) => {
		if (!disabled && onClick) {
			onClick(evt);
		}
	};

	const renderButton = () => {
		return (
			<button
				className={classnames(className, 'c-button', {
					'c-button--active': active,
					'c-button--auto': autoHeight,
					'c-button--small': size === 'small',
					'c-button--large': size === 'large',
					'c-button--block': block,
					'c-button--icon': icon && !label,
					[`c-button--${type}`]: type,
				})}
				onClick={handleButtonClick}
				disabled={disabled}
				aria-label={ariaLabel}
				title={title}
				id={id}
			>
				{children ? (
					children
				) : (
					<div className="c-button__content">
						{icon && (
							<Icon
								className="c-button__icon"
								name={icon}
								active={active}
								type={iconType}
							/>
						)}
						{label && <div className="c-button__label">{label}</div>}
						{arrow && <Icon className="c-button__icon" name="caret-down" />}
					</div>
				)}
			</button>
		);
	};

	if (tooltip && tooltip.trim()) {
		return (
			<Tooltip contentClassName="c-button__tooltip" position="top" offset={20}>
				<TooltipTrigger>
					<span>{renderButton()}</span>
				</TooltipTrigger>
				<TooltipContent>
					<span>{tooltip}</span>
				</TooltipContent>
			</Tooltip>
		);
	}
	return renderButton();
};

export { Button };
