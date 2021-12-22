import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import { DefaultProps } from '../../types';

import './ImageGrid.scss';

export interface ImageGridPropsSchema extends DefaultProps {
	images: string[];
	value?: string[];
	width?: number;
	height?: number;
	fill?: 'cover' | 'contain' | 'auto';
	className?: string;
	backgroundColor?: string;
	allowSelect?: boolean;
	allowMulti?: boolean;
	onChange?: (selectedImages: string[]) => void;
}

export const ImageGrid: FunctionComponent<ImageGridPropsSchema> = ({
	images,
	value = [],
	width = 200,
	height = 200,
	fill = 'cover',
	className = '',
	backgroundColor = 'transparent',
	allowSelect = false,
	allowMulti = false,
	onChange = () => null,
}) => {
	const handleImageClick = (imgSource: string) => {
		if (allowMulti) {
			if (value.includes(imgSource)) {
				const index = value.indexOf(imgSource);
				value.splice(index, 1);
				onChange([...value]);
			} else {
				onChange([...value, imgSource]);
			}
		} else {
			onChange([imgSource]);
		}
	};

	return (
		<div
			className={classnames('c-image-grid', className, {
				'c-image-grid-selectable': allowSelect,
			})}
		>
			{images.map((imgSource) => (
				<div
					key={imgSource}
					className={classnames('c-image-grid__item', {
						'c-image-grid__item-selected': value.includes(imgSource),
					})}
					style={{
						backgroundColor,
						width: `${width}px`,
						height: `${height}px`,
						backgroundImage: `url(${imgSource})`,
						backgroundSize: fill,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center center',
					}}
					onClick={() => handleImageClick(imgSource)}
				/>
			))}
		</div>
	);
};
