import clsx from 'clsx';
import React, { FC } from 'react';

import { bemCls, getVariantClasses } from '../../utils';

import { CardProps } from './Card.types';

const defaultProps: CardProps = {
	edge: 'zinc',
	mode: 'light',
	orientation: 'vertical',
	padding: 'none',
};

const Card: FC<CardProps> = ({
	children,
	className,
	edge,
	image,
	mode,
	offset,
	orientation,
	padding,
	rootClassName: root = 'c-card',
	subtitle,
	title,
	toolbar,
	variants,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants), {
		[bem('', `edge-${edge}`)]: !!edge,
		[bem('', `mode-${mode}`)]: !!mode,
		[bem('', `orientation-${orientation}`)]: !!orientation,
		[bem('', `padded-${padding}`)]: !!padding,
		[bem('', 'offset')]: offset,
	});

	return (
		<article className={rootCls}>
			<section className={clsx(bem('top-wrapper'))}>
				{image && (
					<div className={clsx(bem('image-wrapper'))}>
						{typeof image === 'string' ? (
							<img className='u-image-responsive' src={image} alt={title?.toString() || "The card's image"} /> //eslint-disable-line
						) : (
							image
						)}
					</div>
				)}
			</section>

			<section className={clsx(bem('bottom-wrapper'))}>
				<div className={clsx(bem('header-wrapper'))}>
					{title && <div className={clsx(bem('title-wrapper'))}>{title}</div>}

					{toolbar && <div className={clsx(bem('toolbar-wrapper'))}>{toolbar}</div>}
				</div>

				{subtitle && <div className={clsx(bem('subtitle-wrapper'))}>{subtitle}</div>}

				{children && <div className={clsx(bem('children-wrapper'))}>{children}</div>}
			</section>
		</article>
	);
};

Card.defaultProps = defaultProps;

export default Card;
