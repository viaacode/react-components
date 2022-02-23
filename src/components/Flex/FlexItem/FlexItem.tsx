import React, { FunctionComponent, ReactNode } from 'react';

import { DefaultComponentProps } from '../../../types';

export interface FlexItemPropsSchema extends DefaultComponentProps {
	shrink?: boolean;
	children?: ReactNode;
}

export const FlexItem: FunctionComponent<FlexItemPropsSchema> = ({
	className,
	shrink,
	children,
}) => (
	<div className={className + ' o-flex__item' + (shrink ? ' o-flex__item--shrink' : '')}>
		{children}
	</div>
);
