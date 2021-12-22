import classnames from 'classnames';
import React, { FunctionComponent, useEffect, useState } from 'react';

import { DefaultProps, EnglishContentType } from '../../types';
import { Icon } from '../Icon/Icon';
import { IconNameSchema } from '../Icon/Icon.types';

import './Thumbnail.scss';

export const CATEGORY_TO_ICON: { [category: string]: IconNameSchema } = {
	audio: 'headphone',
	video: 'video',
	collection: 'collection',
	bundle: 'folder',
	search: 'search',
};

export interface ThumbnailPropsSchema extends DefaultProps {
	category: EnglishContentType;
	src?: string;
	alt?: string;
	label?: string;
	meta?: string;
	onClick?: () => void;
	showCategoryIcon?: boolean;
}

export const Thumbnail: FunctionComponent<ThumbnailPropsSchema> = ({
	category,
	className,
	src,
	alt,
	label,
	meta,
	onClick = () => null,
	style,
	showCategoryIcon = false,
}) => {
	const [loaded, setLoaded] = useState(false);
	const iconName = CATEGORY_TO_ICON[category];

	useEffect(() => {
		let img: HTMLImageElement | null = null;

		if (src) {
			img = new Image();
			img.onload = () => setLoaded(true);
			img.src = src;
		}

		return () => {
			if (img) {
				img.onload = () => null;
			}
		};
	}, [src]);

	return (
		<div
			className={classnames(
				className,
				'c-thumbnail',
				'c-thumbnail-media',
				`c-thumbnail-media--${category}`
			)}
			style={style}
			onClick={onClick}
		>
			<div className="c-thumbnail-placeholder">{category && <Icon name={iconName} />}</div>
			{src && (
				<div
					className="c-thumbnail-image"
					style={{ backgroundImage: `url("${src}")` }}
					title={alt}
				/>
			)}
			{(label || meta || showCategoryIcon) && (
				<div
					className={classnames('c-thumbnail-meta', {
						'c-thumbnail-meta--img-is-loaded': loaded,
					})}
				>
					<div className="c-thumbnail-media__category">
						<Icon name={iconName} />
						{label && <p>{label}</p>}
					</div>
					{meta && <div className="c-thumbnail-media__meta">{meta}</div>}
				</div>
			)}
		</div>
	);
};
