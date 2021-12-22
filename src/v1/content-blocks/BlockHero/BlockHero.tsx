import { isString } from 'lodash-es';
import React, { FunctionComponent, ReactNode } from 'react';

import {
	Button,
	ButtonProps,
	ButtonToolbar,
	Container,
	FlowPlayer,
	Spacer,
} from '../../components';
import { defaultRenderLinkFunction } from '../../helpers/render-link';
import { ButtonAction, DefaultProps, RenderLinkFunction } from '../../types';
import { BlockHeading } from '../BlockHeading/BlockHeading';

import './BlockHero.scss';

export interface BlockHeroProps extends DefaultProps {
	title: string;
	titleColor?: string;
	content: string;
	contentColor?: string;
	src?: string;
	poster?: string;
	altText?: string;
	token?: string;
	dataPlayerId?: string;
	buttons?: (ButtonProps & { buttonAction: ButtonAction })[];
	textBelowButtons?: string | ReactNode;
	renderLink?: RenderLinkFunction;
}

export const BlockHero: FunctionComponent<BlockHeroProps> = ({
	title,
	titleColor,
	content,
	contentColor,
	src,
	poster,
	altText,
	token,
	dataPlayerId,
	buttons = [],
	textBelowButtons,
	renderLink = defaultRenderLinkFunction,
}) => (
	<Container mode="vertical" size="large">
		<div className="c-tri__half-split" />
		<div className="c-tri__tr" />
		<div className="c-tri__bl" />

		<div className="c-home-hero">
			<div className="c-home-hero__content">
				<BlockHeading type="h2" color={titleColor} className="c-home-hero__title">
					{title}
				</BlockHeading>
				<div className="c-content c-content--inverse">
					<p className="c-body-1--spaced" style={{ color: contentColor }}>
						{content}
					</p>
				</div>
				{!!buttons && (
					<Spacer margin="top-large">
						<ButtonToolbar>
							{buttons.map(({ buttonAction, ...rest }, index: number) => {
								return renderLink(
									buttonAction,
									<Button {...rest} key={`hero-button-${index}`} />,
									rest.label || rest.ariaLabel || rest.tooltip,
									rest.altTitle || rest.label || rest.ariaLabel || rest.tooltip
								);
							})}
						</ButtonToolbar>
					</Spacer>
				)}
				{!!textBelowButtons && (
					<Spacer margin="top-large" style={{ color: contentColor }}>
						{isString(textBelowButtons) && (
							<p dangerouslySetInnerHTML={{ __html: textBelowButtons }} />
						)}
						{!isString(textBelowButtons) && textBelowButtons}
					</Spacer>
				)}
			</div>
			<div className="c-home-hero__image">
				{!!src && (
					<FlowPlayer
						src={src}
						poster={poster}
						title={altText || 'Hero video'}
						token={token}
						dataPlayerId={dataPlayerId}
					/>
				)}
				{!src && poster && <img src={poster} alt={altText || 'Hero afbeelding'} />}
			</div>
		</div>
	</Container>
);
