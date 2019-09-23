import React, { FunctionComponent, ReactNode } from 'react';

import classNames from 'classnames';

import { DefaultProps } from '../../types';

export interface FlexProps extends DefaultProps {
	orientation?: 'horizontal' | 'vertical';
	center?: boolean;
	justify?: boolean;
	wrapped?: boolean;
	spaced?: 'regular' | 'wide';
	children: ReactNode;
}

export const Flex: FunctionComponent<FlexProps> = ({
	className,
	orientation,
	center,
	justify,
	wrapped,
	spaced,
	children,
}) => {
	const classes = ['o-flex'];

	let orientationClass = 'o-flex-';

	if (orientation) {
		orientationClass += `-${orientation}`;
	}

	if (center) {
		orientationClass += '-center';
	}

	if (orientationClass !== 'o-flex-') {
		classes.push(orientationClass);
	}

	if (spaced) {
		classes.push(`o-flex--spaced-${spaced}`.replace('-regular', ''));
	}

	return (
		<div
			className={classNames(className, ...classes, {
				'o-flex--justify-between': justify,
				'o-flex--wrap': wrapped,
			})}
		>
			{children}
		</div>
	);
};
