import classnames from 'classnames';
import { get } from 'lodash-es';
import React, { FunctionComponent, ReactNode } from 'react';

import { Button, ButtonType, Spacer } from '../../components';
import { defaultRenderLinkFunction } from '../../helpers/render-link';
import { AlignOptions, ButtonAction, DefaultProps, RenderLinkFunction } from '../../types';

import './BlockImageGrid.scss';

export interface GridItem {
	source: string;
	titleAbove?: string;
	title?: string;
	textAbove?: string | ReactNode;
	text?: string | ReactNode;
	buttonLabel?: string;
	buttonType?: ButtonType;
	buttonTitle?: string;
	buttonAltTitle?: string;
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
	textSize?: number;
	textMargin?: number;
	textWeight?: number;
	textColor?: string;
	className?: string;
	horizontalMargin?: number;
	verticalMargin?: number;
	renderLink?: RenderLinkFunction;
}

export const BlockImageGrid: FunctionComponent<BlockImageGridProps> = ({
	elements = [],
	imageWidth = 200,
	imageHeight = 200,
	itemWidth = 200,
	fill = 'cover',
	align = 'center',
	textAlign = 'center',
	textSize = 15,
	textMargin = 0,
	textWeight = 500,
	textColor = '#2B414F',
	horizontalMargin = 10,
	verticalMargin = 10,
	className,
	renderLink = defaultRenderLinkFunction,
}) => {
	const renderGridImage = (element: GridItem) => {
		return (
			<>
				{element.textAbove && (
					<div className="c-block-grid__text-wrapper">
						<Spacer margin="bottom-small">
							<p>{element.textAbove}</p>
						</Spacer>
					</div>
				)}
				<div
					className="c-block-grid__image"
					style={{
						width: `${imageWidth}px`,
						height: `${imageHeight}px`,
						backgroundImage: `url(${element.source})`,
						backgroundSize: fill,
					}}
				/>
				<div
					className="c-block-grid__text-wrapper"
					style={{
						color: textColor,
					}}
				>
					{!!element.title && (
						<Spacer margin="top-small">
							<h3
								style={{
									fontSize: `${textSize}px`,
									margin: `${textMargin}px 0`,
									fontWeight: textWeight,
								}}
							>
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
							{renderLink(
								element.action,
								<Button
									label={element.buttonLabel}
									type={element.buttonType}
									title={element.buttonTitle}
									ariaLabel={element.buttonLabel || element.buttonTitle}
								/>,
								element.buttonLabel,
								element.buttonAltTitle || element.buttonLabel
							)}
						</Spacer>
					)}
				</div>
			</>
		);
	};

	return (
		<div
			className={classnames(
				'c-block-grid',
				`text-align-${textAlign}`,
				`item-align-${align}`,
				className
			)}
		>
			{elements.map((element) => (
				<div
					key={`block-grid-${get(element, 'action.value')}`}
					className={classnames('c-block-grid__item')}
					style={{
						width: `${itemWidth}px`,
						margin: `${Math.round(verticalMargin / 2)}px ${Math.round(
							horizontalMargin / 2
						)}px`,
					}}
				>
					{renderLink(
						element.action,
						renderGridImage(element),
						element.title || element.buttonTitle || element.titleAbove
					)}
				</div>
			))}
		</div>
	);
};
