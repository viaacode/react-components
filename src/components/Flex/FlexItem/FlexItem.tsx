import type { FunctionComponent, ReactNode } from 'react';

import type { DefaultComponentProps } from '../../../types/index';

export interface FlexItemProps extends DefaultComponentProps {
	shrink?: boolean;
	children?: ReactNode;
}

export const FlexItem: FunctionComponent<FlexItemProps> = ({ className, shrink, children }) => (
	<div className={`${className} o-flex__item${shrink ? ' o-flex__item--shrink' : ''}`}>
		{children}
	</div>
);
