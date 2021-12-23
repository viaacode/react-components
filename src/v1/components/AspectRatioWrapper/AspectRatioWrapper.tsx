import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import { DefaultProps, VideoAspectRatio } from '../../types';

import './AspectRatioWrapper.scss';

export interface AspectRatioWrapperPropsSchema extends DefaultProps {
	aspect?: VideoAspectRatio | number;
}

export const AspectRatioWrapper: FunctionComponent<AspectRatioWrapperPropsSchema> = ({
	aspect = 1.777777,
	children,
	className,
	style,
}) => (
	<div
		className={classnames(
			className,
			'c-aspect-ratio-wrapper',
			!!aspect &&
				typeof aspect === 'string' &&
				`c-aspect-ratio-wrapper--aspect-${(aspect as string).replace(':', '-')}`
		)}
		style={{
			...style,
			...(typeof aspect === 'number'
				? { paddingBottom: `${Math.round(10000 / aspect) / 100}%` }
				: {}),
		}}
	>
		{children}
	</div>
);
