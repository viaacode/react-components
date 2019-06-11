import React, { FunctionComponent } from 'react';

import classNames from 'classnames';

import { Icon } from '../Icon/Icon';

export interface ButtonProps {
	label?: string;
	type?:
		| 'primary'
		| 'secondary'
		| 'secondary-i'
		| 'tertiary'
		| 'borderless'
		| 'borderless-i'
		| 'danger'
		| 'danger-hover'
		| 'link';
	size?: 'small';
	icon?: string;
	arrow?: boolean;
	disabled?: boolean;
	onClick?(event: React.MouseEvent<HTMLElement>): void;
}

const Button: FunctionComponent<ButtonProps> = ({
	label,
	type,
	size,
	icon,
	arrow,
	disabled,
	onClick,
}: ButtonProps) => (
	<button
		className={classNames('c-button', {
			'c-button--small': size === 'small',
			'c-button--icon': icon && !label,
			[`c-button--${type}`]: type,
		})}
		onClick={onClick}
		disabled={disabled}
	>
		<div className="c-button__content">
			{icon && <Icon name={icon} />}
			{label && <div className="c-button__label">{label}</div>}
			{arrow && <Icon name="caret-down" />}
		</div>
	</button>
);

Button.defaultProps = {
	type: 'primary',
};

export { Button };