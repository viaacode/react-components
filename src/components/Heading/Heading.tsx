import React, { FunctionComponent, ReactNode } from 'react';

import classNames from 'classnames';

import { DefaultProps } from '../../types';

export interface HeadingProps extends DefaultProps {
	type: 'h1' | 'h2' | 'h3' | 'h4';
	onClick?: (() => void) | undefined;
	children: ReactNode;
}

export const Heading: FunctionComponent<HeadingProps> = ({
	className,
	children,
	type: Type,
	onClick,
}) => (
	<Type className={classNames(className, `c-${Type}`)} onClick={onClick}>
		{children}
	</Type>
);