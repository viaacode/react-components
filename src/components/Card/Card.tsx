import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

import { bemCls, getVariantClasses, keysEnter, keysSpacebar, onKey } from '../../utils';

import { CardProps } from './Card.types';

export const cardDefaultProps: CardProps = {
	edge: 'zinc',
	mode: 'light',
	orientation: 'vertical',
	padding: 'none',
	linkComponent: ({ children }) => <>{children}</>,
};

const Card: FC<CardProps> = (props) => {
	const {
		children,
		className,
		edge,
		image,
		mode,
		offset,
		onClick,
		orientation,
		padding,
		rootClassName: root = 'c-card',
		shadow,
		subtitle,
		caption,
		tags,
		title,
		toolbar,
		variants,
		linkComponent,
		to,
	} = { ...cardDefaultProps, ...props };
	const Link = linkComponent as FC<{ children: ReactNode; href: string }>;

	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants), {
		[bem('', 'offset')]: offset,
		[bem('', 'shadow')]: shadow,
		[bem('', `edge-${edge}`)]: !!edge,
		[bem('', `mode-${mode}`)]: !!mode,
		[bem('', `orientation-${orientation}`)]: !!orientation,
		[bem('', `padded-${padding}`)]: !!padding,
	});

	const wrapInLinkIfExist = (children: ReactNode | string): ReactNode => {
		if (to) {
			return <Link href={to}>{children}</Link>;
		} else {
			return children;
		}
	};

	return (
		<article
			className={rootCls}
			{...(onClick
				? {
						onClick,
						role: 'button',
						tabIndex: 0,
						onKeyUp: (e) => onKey(e, [...keysSpacebar, ...keysEnter], () => onClick()),
				  }
				: {})}
		>
			{wrapInLinkIfExist(
				<section className={clsx(bem('top-wrapper'))}>
					{tags && <div className={clsx(bem('tags-wrapper'))}>{tags}</div>}

					{image && (
						<div className={clsx(bem('image-wrapper'))}>
							{typeof image === 'string' ? (
								<img
									className="u-image-responsive"
									src={image}
									alt={title?.toString() || "The card's image"}
								/> //eslint-disable-line
							) : (
								image
							)}
						</div>
					)}
				</section>
			)}

			<section className={clsx(bem('bottom-wrapper'))}>
				{toolbar && <div className={clsx(bem('toolbar-wrapper'))}>{toolbar}</div>}
				{wrapInLinkIfExist(
					<div>
						{(title || toolbar) && (
							<div className={clsx(bem('header-wrapper'))}>
								{title && <div className={clsx(bem('title-wrapper'))}>{title}</div>}
							</div>
						)}

						{subtitle && (
							<div className={clsx(bem('subtitle-wrapper'))}>{subtitle}</div>
						)}

						{caption && <div className={clsx(bem('subtitle-wrapper'))}>{caption}</div>}

						{children && (
							<div className={clsx(bem('children-wrapper'))}>{children}</div>
						)}
					</div>
				)}
			</section>
		</article>
	);
};

export default Card;
