import classnames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import { DefaultProps, Orientation } from '../../types';

import './Container.scss';

export interface ContainerPropsSchema extends DefaultProps {
	mode?: Orientation;
	size?: 'small' | 'medium' | 'large' | 'full-width';
	background?: 'white' | 'alt' | 'inverse';
	bordered?: boolean;
	children: ReactNode;
}

export const Container: FunctionComponent<ContainerPropsSchema> = ({
	mode,
	size,
	background,
	bordered,
	className,
	children,
	style = {},
}) => (
	<div
		className={classnames(className, {
			'o-container': mode === 'horizontal',
			'o-container-vertical': mode === 'vertical',
			[`o-container--${size}`]: (mode === 'horizontal' || !mode) && size,
			[`o-container-vertical--${size}`]: mode === 'vertical' && size,
			[`o-container-vertical--bg-${background}`]: background,
			'o-container-vertical--bottom-bordered': bordered,
		})}
		style={style}
	>
		{children}
	</div>
);
