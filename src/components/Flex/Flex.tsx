import type { FunctionComponent, ReactNode } from 'react';

import type { DefaultComponentProps } from '../../types/index.js';

import './Flex.scss';

export type Orientation = 'horizontal' | 'vertical';

export interface FlexProps extends DefaultComponentProps {
	align?: 'start' | 'baseline';
	center?: boolean;
	children: ReactNode;
	justify?: 'around' | 'between' | 'end';
	orientation?: Orientation;
	spaced?: 'regular' | 'wide';
	wrap?: boolean;
}

export const Flex: FunctionComponent<FlexProps> = ({
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
		!!justify && `o-flex--justify-${justify}`,
		!!wrap && 'o-flex--wrap',
	];

	return (
		<div className={`${className} ${classes.join(' ')}`} style={style}>
			{children}
		</div>
	);
};
