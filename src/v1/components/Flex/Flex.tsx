import classnames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import { DefaultProps, Orientation } from '../../types';

import './Flex.scss';

export interface FlexPropsSchema extends DefaultProps {
	align?: 'start' | 'baseline';
	center?: boolean;
	children: ReactNode;
	justify?: 'around' | 'between' | 'end';
	orientation?: Orientation;
	spaced?: 'regular' | 'wide';
	wrap?: boolean;
}

export const Flex: FunctionComponent<FlexPropsSchema> = ({
	align,
	center,
	children,
	className,
	justify,
	orientation,
	spaced,
	wrap,
	style,
}) => {
	let orientationClass = '';

	if (orientation) {
		orientationClass += `-${orientation}`;
	}

	if (center) {
		orientationClass += '-center';
	}

	const classes = [
		'o-flex',
		!!orientationClass && `o-flex-${orientationClass}`,
		!!align && `o-flex--align-${align}`,
		!!spaced && `o-flex--spaced-${spaced}`.replace('-regular', ''),
	];

	return (
		<div
			className={classnames(className, ...classes, {
				[`o-flex--justify-${justify}`]: justify,
				'o-flex--wrap': wrap,
			})}
			style={style}
		>
			{children}
		</div>
	);
};
