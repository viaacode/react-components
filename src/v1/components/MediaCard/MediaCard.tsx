import classnames from 'classnames';
import React, { FunctionComponent, MouseEvent, ReactNode } from 'react';

import { useSlot } from '../../hooks/useSlot';
import { DefaultProps, EnglishContentType, Orientation } from '../../types';

import './MediaCard.scss';
import { MediaCardMetaData, MediaCardThumbnail } from './MediaCard.slots';

export interface MediaCardPropsSchema extends DefaultProps {
	title: string;
	category: EnglishContentType;
	children?: ReactNode;
	orientation?: Orientation;
	onClick?: (evt: MouseEvent<HTMLElement>) => void;
}

export const MediaCard: FunctionComponent<MediaCardPropsSchema> = ({
	className,
	title,
	category,
	children = [],
	orientation = 'vertical',
	onClick,
}) => {
	const thumbnail = useSlot(MediaCardThumbnail, children);
	const metaData = useSlot(MediaCardMetaData, children);

	return (
		<div
			className={classnames(className, 'c-media-card', `c-media-card--${category}`, {
				'c-media-card--horizontal': orientation === 'horizontal',
				'u-clickable': !!onClick,
			})}
			onClick={(evt) => onClick && onClick(evt)}
		>
			{thumbnail && <div className="c-media-card-thumb">{thumbnail}</div>}
			<div className="c-media-card-content">
				<h4 className="c-media-card__title">{title}</h4>
				{metaData && metaData}
			</div>
		</div>
	);
};
