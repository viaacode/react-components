import classnames from 'classnames';
import React, { ElementType, FunctionComponent, ReactNode } from 'react';

import { DefaultProps } from '../../../types';

export type GridSizeSchema =
	| '1'
	| '2'
	| '3'
	| '4'
	| '5'
	| '6'
	| '7'
	| '8'
	| '9'
	| '10'
	| '11'
	| '12'
	| '1-1'
	| '1-2'
	| '1-3'
	| '1-4'
	| '1-5'
	| '1-6'
	| '1-7'
	| '1-8'
	| '1-9'
	| '1-10'
	| '1-11'
	| '1-12'
	| '2-1'
	| '2-2'
	| '2-3'
	| '2-4'
	| '2-5'
	| '2-6'
	| '2-7'
	| '2-8'
	| '2-9'
	| '2-10'
	| '2-11'
	| '2-12'
	| '3-1'
	| '3-2'
	| '3-3'
	| '3-4'
	| '3-5'
	| '3-6'
	| '3-7'
	| '3-8'
	| '3-9'
	| '3-10'
	| '3-11'
	| '3-12'
	| 'static'
	| 'flex';

export interface ColumnPropsSchema extends DefaultProps {
	children: ReactNode;
	size: GridSizeSchema[] | GridSizeSchema;
	tag?: ElementType;
}

export const Column: FunctionComponent<ColumnPropsSchema> = ({
	children,
	className,
	size,
	tag: Tag = 'div',
}) => {
	const getGridSizeColumn = (size: GridSizeSchema): string => {
		const prefix = size.includes('-') ? 'bp' : '';

		return `o-grid-col-${prefix}${size}`;
	};

	const sizes = typeof size === 'string' ? [size] : size;

	return (
		<Tag className={classnames(className, sizes.map(getGridSizeColumn).join(' '))}>
			{children}
		</Tag>
	);
};
