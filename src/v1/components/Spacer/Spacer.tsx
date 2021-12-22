import classnames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import { DefaultProps } from '../../types';

import './Spacer.scss';

export type SpacerOptionSchema =
	| 'small'
	| 'medium'
	| 'large'
	| 'extra-large'
	| 'left-small'
	| 'left'
	| 'left-large'
	| 'left-extra-large'
	| 'top-small'
	| 'top'
	| 'top-large'
	| 'top-extra-large'
	| 'right-small'
	| 'right'
	| 'right-large'
	| 'right-extra-large'
	| 'bottom-small'
	| 'bottom'
	| 'bottom-large'
	| 'bottom-extra-large'
	| 'none'; // Useful for having a margin on desktop, but no margin on mobile

export interface SpacerPropsSchema extends DefaultProps {
	children?: ReactNode;
	margin?: SpacerOptionSchema | SpacerOptionSchema[];
	padding?: SpacerOptionSchema | SpacerOptionSchema[];
}

const abbreviateSizes = (input: string): string => {
	return input.replace('large', 'l').replace('extra-', 'x').replace('small', 's');
};

const spacersToClasses = (
	spacer: SpacerOptionSchema | SpacerOptionSchema[] = [],
	classPrefix: string
): string[] => {
	if (spacer === 'none') {
		return [];
	}
	const spacerArray = Array.isArray(spacer) ? spacer : [spacer];

	return spacerArray.map((option) =>
		option !== 'medium' ? `${classPrefix}-${abbreviateSizes(option)}` : classPrefix
	);
};

export const Spacer: FunctionComponent<SpacerPropsSchema> = ({
	children,
	className,
	margin = 'medium',
	padding,
	style = {},
}) => {
	const marginClasses = spacersToClasses(margin, 'u-spacer');
	const paddingClasses = spacersToClasses(padding, 'u-padding');

	return (
		<div className={classnames(className, marginClasses, paddingClasses)} style={style}>
			{children}
		</div>
	);
};
