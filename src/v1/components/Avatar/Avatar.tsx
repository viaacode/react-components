import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import { DefaultProps } from '../../types';

import './Avatar.scss';
import { AvatarIcon, AvatarIconPropsSchema } from './AvatarIcon/AvatarIcon';

export interface AvatarPropsSchema extends DefaultProps, AvatarIconPropsSchema {
	name?: string;
	title?: string;
	dark?: boolean;
}

export const Avatar: FunctionComponent<AvatarPropsSchema> = ({
	className,
	initials,
	size,
	image,
	icon,
	name,
	title,
	dark = false,
}) =>
	name || title ? (
		<div className={classnames(className, 'c-avatar-and-text')}>
			<AvatarIcon initials={initials} size={size} image={image} />
			<div className="c-avatar-and-text__text">
				{name && <p className={classnames({ 'u-color-white': !dark })}>{name}</p>}
				{title && <p className={dark ? 'u-text-muted' : 'u-color-gray-150'}>{title}</p>}
			</div>
		</div>
	) : (
		<AvatarIcon
			className={className}
			initials={initials}
			size={size}
			image={image}
			icon={icon}
		/>
	);
