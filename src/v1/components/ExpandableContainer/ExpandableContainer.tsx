import React, { Fragment, FunctionComponent, ReactNode } from 'react';

import useCollapsed from '../../hooks/react-collapsed/react-collapsed';
import { Button } from '../Button/Button';
import { Spacer } from '../Spacer/Spacer';

export interface ExpandableContainerPropsSchema {
	expandLabel?: string;
	collapseLabel?: string;
	collapsedHeight?: number;
	defaultExpanded?: boolean;
	children: ReactNode;
}

export const ExpandableContainer: FunctionComponent<ExpandableContainerPropsSchema> = ({
	expandLabel = 'Meer lezen',
	collapseLabel = 'Minder lezen',
	collapsedHeight = 44,
	defaultExpanded = false,
	children,
}) => {
	const { getCollapseProps, getToggleProps, isOpen } = useCollapsed({
		collapsedHeight,
		defaultOpen: defaultExpanded,
	});

	return (
		<Fragment>
			<div {...getCollapseProps()}>
				<div>{children}</div>
			</div>
			<Spacer margin="top-small">
				<div className="u-text-center" {...(getToggleProps() as any)}>
					<Button type="secondary" label={isOpen ? collapseLabel : expandLabel} />
				</div>
			</Spacer>
		</Fragment>
	);
};
