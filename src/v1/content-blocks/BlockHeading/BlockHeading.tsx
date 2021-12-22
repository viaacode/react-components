import classnames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import { AlignOptions, DefaultProps, HeadingType } from '../../types';

export interface BlockHeadingProps extends DefaultProps {
	type: HeadingType;
	color?: string;
	children: ReactNode;
	align?: AlignOptions;
	onClick?: (() => void) | undefined;
}

export const BlockHeading: FunctionComponent<BlockHeadingProps> = ({
	type: Type,
	color,
	children,
	align = 'left',
	onClick,
	className,
}) => (
	<Type
		className={classnames(className, `c-${Type}`, `u-text-${align}`)}
		onClick={onClick}
		style={color ? { color, margin: 0 } : { margin: 0 }}
	>
		{children}
	</Type>
);
