import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import { BadgeProps } from './Badge.types';

export const Badge: FunctionComponent<BadgeProps> = ({
	className,
	text,
	type = 'default',
	rootClassName: root = 'c-badge',
	variants,
}) => (
	<div className={classnames(className, 'c-badge', { [`c-badge--${type}`]: type })}>{text}</div>
);
