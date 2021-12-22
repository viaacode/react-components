import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import { DefaultProps } from '../../types';

import './Badge.scss';

export interface BadgePropsSchema extends DefaultProps {
	text: string;
	type?: 'default' | 'success' | 'error';
}

export const Badge: FunctionComponent<BadgePropsSchema> = ({
	className,
	text,
	type = 'default',
}) => (
	<div className={classnames(className, 'c-badge', { [`c-badge--${type}`]: type })}>{text}</div>
);
