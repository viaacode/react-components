import classnames from 'classnames';
import React, { ElementType, FunctionComponent, ReactNode } from 'react';

import { DefaultProps } from '../../types';

import './Grid.scss';

export interface GridPropsSchema extends DefaultProps {
	children: ReactNode;
	noWrap?: boolean;
	reverse?: boolean;
	tag?: ElementType;
}

export const Grid: FunctionComponent<GridPropsSchema> = ({
	children,
	className,
	noWrap,
	reverse,
	tag: Tag = 'div',
}) => (
	<Tag
		className={classnames(className, 'o-grid', {
			'o-grid--no-wrap': noWrap,
			'o-grid--reverse': reverse,
		})}
	>
		{children}
	</Tag>
);
