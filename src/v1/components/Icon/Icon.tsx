import classnames from 'classnames';
import { camelCase, kebabCase, upperFirst } from 'lodash-es';
import React, { FunctionComponent } from 'react';

import { DefaultProps } from '../../types';

import './Icon.scss';
import { IconNameSchema, IconTypeSchema } from './Icon.types';
import * as Icons from './Icons';

export interface IconPropsSchema extends DefaultProps {
	name?: IconNameSchema;
	size?: 'small' | 'large' | 'huge';
	type?: IconTypeSchema;
	subtle?: boolean;
	active?: boolean;
}

export const Icon: FunctionComponent<IconPropsSchema> = ({
	className,
	name = 'slash',
	size,
	type,
	subtle = false,
	active,
}) => {
	let IconToRender = (Icons as any)[upperFirst(camelCase(name))];

	function getIconName() {
		const base = 'o-svg-icon';
		const iconName = kebabCase(name);

		return `${base}-${type || ''}-${iconName}`;
	}

	if (!IconToRender) {
		console.error(`Icon with name: ${name} was not found.`);
		IconToRender = (Icons as any)['Slash'];
	}

	return (
		<div
			className={classnames(className, 'o-svg-icon', getIconName(), {
				'o-svg-icon--action-active': active,
				'o-svg-icon-multicolor': type === 'multicolor',
				'o-svg-icon--subtle': subtle,
				[`o-svg-icon--${size}`]: size,
			})}
		>
			<IconToRender key={name} />
		</div>
	);
};
