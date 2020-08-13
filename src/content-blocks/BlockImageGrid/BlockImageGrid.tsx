import classnames from 'classnames';
import { get } from 'lodash-es';
import React, { FunctionComponent, ReactNode } from 'react';

import { Button, ButtonType, Spacer } from '../../components';
import { AlignOptions, ButtonAction, DefaultProps } from '../../types';

import './BlockImageGrid.scss';

export interface GridItem {
	source: string;
	title?: string;
	text?: string | ReactNode;
	buttonLabel?: string;
	buttonType?: ButtonType;
	buttonTitle?: string;
	action?: ButtonAction;
}

export interface BlockImageGridProps extends DefaultProps {
	elements: GridItem[];
	imageWidth?: number;
	imageHeight?: number;
	itemWidth?: number;
	fill?: 'cover' | 'contain' | 'auto';
	align?: AlignOptions;
	textAlign?: AlignOptions;
	className?: string;
	navigate?: (action: ButtonAction) => void;
}

export const BlockImageGrid: FunctionComponent<BlockImageGridProps> = ({
	elements = [],
	imageWidth = 200,
	imageHeight = 200,
	itemWidth = 200,
	fill = 'cover',
	align = 'center',
	textAlign = 'center',
	className,
	navigate,
}) => {
	return (
		<div
			className={classnames(
				'c-block-grid',
				`text-align-${textAlign}`,
				`item-align-${align}`,
				className
			)}
		>
			{elements.map(element => (
				<div
					key={`block-grid-${get(element, 'action.value')}`}
					className={classnames('c-block-grid__item', {
						'u-clickable': !!navigate && !!element.action,
					})}
					style={{ width: `${itemWidth}px` }}
					onClick={() => {
						if (element.action && navigate) {
							navigate(element.action);
						}
					}}
				>
					<div
						className="c-block-grid__image"
						style={{
							width: `${imageWidth}px`,
							height: `${imageHeight}px`,
							backgroundImage: `url(${element.source})`,
							backgroundSize: fill,
						}}
					/>
					<div className="c-block-grid__text-wrapper">
						{!!element.title && (
							<Spacer margin="top-small">
								<h3>
									<strong>{element.title}</strong>
								</h3>
							</Spacer>
						)}
						{!!element.text && (
							<Spacer margin="top-small">
								<p>{element.text}</p>
							</Spacer>
						)}
						{!!element.buttonLabel && (
							<Spacer margin="top-small" className="c-block-grid__button-spacer">
								<Button
									label={element.buttonLabel}
									type={element.buttonType}
									title={element.buttonTitle}
									ariaLabel={element.buttonLabel || element.buttonTitle}
								/>
							</Spacer>
						)}
					</div>
				</div>
			))}
		</div>
	);
};