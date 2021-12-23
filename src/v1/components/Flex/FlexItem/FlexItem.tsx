import classnames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import { DefaultProps } from '../../../types';

export interface FlexItemPropsSchema extends DefaultProps {
	shrink?: boolean;
	children?: ReactNode;
}

export const FlexItem: FunctionComponent<FlexItemPropsSchema> = ({
	className,
	shrink,
	children,
}) => (
	<div
		className={classnames(className, 'o-flex__item', {
			'o-flex__item--shrink': shrink,
		})}
	>
		{children}
	</div>
);
