import classnames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import { DefaultProps } from '../../types';

export interface BoxPropsSchema extends DefaultProps {
	condensed?: boolean;
	backgroundColor?: 'gray' | 'soft-white' | 'white' | 'dark';
	children: ReactNode;
}

export const Box: FunctionComponent<BoxPropsSchema> = ({
	children,
	className,
	condensed,
	backgroundColor = 'gray',
}) => (
	<div
		className={classnames(className, 'c-box', {
			'c-box--padding-small': condensed,
			[`c-box--${backgroundColor}`]: backgroundColor !== 'gray',
		})}
	>
		{children}
	</div>
);
