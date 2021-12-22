import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import { DefaultProps } from '../../types';

import './Image.scss';

export interface ImagePropsSchema extends DefaultProps {
	src: string;
	alt?: string;
	wide?: boolean;
	width?: string;
	height?: string;
}

export const Image: FunctionComponent<ImagePropsSchema> = ({
	className,
	src,
	alt,
	wide,
	width,
	height,
}) => (
	<div className={classnames(className, 'c-image', { 'c-image--full': wide })}>
		<img src={src} alt={alt} width={width} height={height} />
	</div>
);
