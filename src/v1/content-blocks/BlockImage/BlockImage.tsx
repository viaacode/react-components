import classnames from 'classnames';
import React, { CSSProperties, FunctionComponent } from 'react';

import { Container } from '../../components/Container/Container';
import { Image } from '../../components/Image/Image';
import { AlignOptions, DefaultProps } from '../../types';

import './BlockImage.scss';

export interface BlockImageProps extends DefaultProps {
	imageSource: string;
	imageDescription?: string;
	title?: string;
	text?: string;
	width?: 'page-header' | 'full-width' | string;
	align?: AlignOptions;
}

export const BlockImage: FunctionComponent<BlockImageProps> = ({
	className,
	imageSource,
	imageDescription = '',
	title = '',
	text = '',
	width = '100%',
	align = 'center',
}) => {
	const style: CSSProperties = {};
	if (width === 'page-header') {
		style.paddingTop = `${100 * (521 / 1920)}%`;
		style.width = '100%';
		style.backgroundImage = `url('${imageSource}')`;
	} else if (width === 'full-width') {
		style.width = '100%';
	} else {
		style.width = width;
	}

	return (
		<Container
			className={classnames(
				className,
				'o-block-image',
				`o-block-image__${align}`,
				`o-block-image__${width}`,
				{
					'o-block-image__page-header-image': width === 'page-header',
				}
			)}
			style={style}
		>
			{width !== 'page-header' && (
				<Image src={imageSource} alt={imageDescription || title || text} wide />
			)}
			{(!!title || !!text) && (
				<div className="a-block-image__annotation">
					{title && <h3>&#169; {title}</h3>}
					{text && <p className="a-block-image__text">{text}</p>}
				</div>
			)}
		</Container>
	);
};
