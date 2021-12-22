import classnames from 'classnames';
import { get, last } from 'lodash-es';
import React, { FunctionComponent, ReactNode, useState } from 'react';

import {
	Button,
	Column,
	Grid,
	IconName,
	MediaCard,
	MediaCardMetaData,
	MediaCardThumbnail,
	MetaData,
	MetaDataItem,
	Modal,
	ModalBody,
	Spacer,
	Thumbnail,
	Toolbar,
	ToolbarLeft,
	ToolbarRight,
} from '../../components';
import { ButtonTypeSchema } from '../../components/Button/Button.types';
import { MetaDataItemPropsSchema } from '../../components/MetaData/MetaDataItem/MetaDataItem';
import { defaultRenderLinkFunction } from '../../helpers/render-link';
import {
	ButtonAction,
	DefaultProps,
	EnglishContentType,
	HeadingType,
	Orientation,
	RenderLinkFunction,
} from '../../types';
import { BlockHeading } from '../BlockHeading/BlockHeading';

import './BlockMediaGrid.scss';

export type MediaListItem = {
	category: EnglishContentType;
	metadata?: MetaDataItemPropsSchema[];
	thumbnail?: { label: string; meta?: string; src?: string };
	src?: string;
	title: string;
	itemAction: ButtonAction;
	buttonLabel?: string;
	buttonAltTitle?: string;
	buttonIcon?: IconName;
	buttonType?: ButtonTypeSchema;
	buttonAction?: ButtonAction;
};

export interface BlockMediaGridProps extends DefaultProps {
	title?: string;
	buttonLabel?: string;
	buttonAltTitle?: string;
	buttonAction?: ButtonAction;
	ctaTitle?: string;
	ctaTitleColor?: string;
	ctaTitleSize?: HeadingType;
	ctaContent?: string;
	ctaContentColor?: string;
	ctaButtonLabel?: string;
	ctaButtonAltTitle?: string;
	ctaButtonType?: ButtonTypeSchema;
	ctaButtonIcon?: IconName;
	ctaBackgroundColor?: string;
	ctaBackgroundImage?: string;
	ctaWidth?: string;
	ctaButtonAction?: ButtonAction;
	fullWidth?: boolean;
	openMediaInModal?: boolean;
	elements: MediaListItem[];
	orientation?: Orientation;
	renderLink?: RenderLinkFunction;
	renderPlayerModalBody?: (item: MediaListItem) => ReactNode;
}

export const BlockMediaGrid: FunctionComponent<BlockMediaGridProps> = ({
	title,
	buttonLabel,
	buttonAltTitle,
	buttonAction,
	ctaTitle = '',
	ctaTitleColor,
	ctaTitleSize = 'h4',
	ctaContent = '',
	ctaContentColor,
	ctaButtonLabel = '',
	ctaButtonAltTitle = '',
	ctaBackgroundColor,
	ctaBackgroundImage,
	ctaButtonType = 'secondary',
	ctaButtonIcon,
	ctaButtonAction,
	fullWidth = false,
	openMediaInModal = false,
	className,
	elements = [],
	orientation,
	renderLink = defaultRenderLinkFunction,
	renderPlayerModalBody = () => null,
}) => {
	const hasCTA = ctaTitle || ctaButtonLabel || ctaContent;

	const [activeItem, setActiveItem] = useState<MediaListItem | null>(null);

	const openInModal = (mediaListItem: MediaListItem): boolean => {
		return openMediaInModal && get(mediaListItem, 'itemAction.type') === 'ITEM';
	};

	const renderCTA = () => {
		return (
			<>
				<div className="c-media-card-thumb">
					<div
						className="c-thumbnail"
						style={{
							backgroundImage: ctaBackgroundImage
								? `url('${ctaBackgroundImage}')`
								: 'none',
							backgroundColor: ctaBackgroundColor,
						}}
					>
						<div className="c-thumbnail__content">
							{ctaTitle && (
								<BlockHeading type={ctaTitleSize} color={ctaTitleColor}>
									{ctaTitle}
								</BlockHeading>
							)}
							{ctaContent && (
								<div style={{ color: ctaContentColor }}>{ctaContent}</div>
							)}
						</div>
					</div>
				</div>
				<div className="c-media-card-content">
					{!!get(last(elements), 'buttonLabel') && !fullWidth && (
						<div>
							<h4 className="c-media-card__title">titel</h4>
							<MetaData category="item">
								<MetaDataItem key={`block-media-list-meta-cta`} label="meta" />
							</MetaData>
						</div>
					)}
					<Spacer margin="top-small">
						<Button label={ctaButtonLabel} type={ctaButtonType} icon={ctaButtonIcon} />
					</Spacer>
				</div>
			</>
		);
	};

	const renderMediaCard = (mediaListItem: MediaListItem) => {
		const { category, metadata, thumbnail, title, buttonLabel, buttonIcon, buttonType } =
			mediaListItem;

		return (
			<MediaCard category={category} orientation={orientation} title={title}>
				{thumbnail && (
					<MediaCardThumbnail>
						<Thumbnail alt={title} category={category} {...thumbnail} />
					</MediaCardThumbnail>
				)}
				<MediaCardMetaData>
					<div>
						{metadata && metadata.length > 0 && (
							<MetaData category={category}>
								{metadata.map((props, i) => (
									<MetaDataItem key={`block-media-list-meta-${i}`} {...props} />
								))}
							</MetaData>
						)}
						{(!!buttonIcon || !!buttonLabel) && (
							<Spacer margin="top-small">
								<div
									onClick={(evt) => {
										evt.stopPropagation(); // Avoid triggering the click on the media card
									}}
								>
									{renderLink(
										mediaListItem.buttonAction || mediaListItem.itemAction,
										<Button
											label={buttonLabel}
											type={buttonType}
											icon={buttonIcon}
										/>,
										mediaListItem.buttonLabel || mediaListItem.title,
										mediaListItem.buttonAltTitle ||
											mediaListItem.buttonLabel ||
											mediaListItem.title
									)}
								</div>
							</Spacer>
						)}
					</div>
				</MediaCardMetaData>
			</MediaCard>
		);
	};

	return (
		<div className={classnames(className, 'c-block-media-list c-media-card-list')}>
			{(!!title || !!buttonLabel) && (
				<Toolbar>
					<ToolbarLeft>
						{title && <BlockHeading type="h2">{title}</BlockHeading>}
					</ToolbarLeft>
					<ToolbarRight>
						{buttonLabel &&
							renderLink(
								buttonAction,
								<Button label={buttonLabel} type="secondary" />,
								buttonLabel,
								buttonAltTitle || buttonLabel
							)}
					</ToolbarRight>
				</Toolbar>
			)}
			<Grid>
				{elements.map((mediaListItem, i) => {
					return (
						<Column key={`block-media-list-${i}`} size={fullWidth ? '3-12' : '3-3'}>
							{openInModal(mediaListItem) ? (
								<div onClick={() => setActiveItem(mediaListItem)}>
									{renderMediaCard(mediaListItem)}
								</div>
							) : (
								renderLink(
									mediaListItem.itemAction,
									renderMediaCard(mediaListItem),
									mediaListItem.title,
									mediaListItem.buttonAltTitle || mediaListItem.title
								)
							)}
						</Column>
					);
				})}
				{hasCTA && (
					<Column size={fullWidth ? '3-12' : '3-3'}>
						<div className={classnames(className, 'c-media-card', 'c-media-card__cta')}>
							{renderLink(
								ctaButtonAction,
								renderCTA(),
								ctaButtonLabel || ctaTitle,
								ctaButtonAltTitle || ctaButtonLabel || ctaTitle
							)}
						</div>
					</Column>
				)}
			</Grid>
			<Modal
				isOpen={!!activeItem && !!activeItem.src}
				onClose={() => setActiveItem(null)}
				scrollable
				size="medium"
			>
				<ModalBody>{!!activeItem && renderPlayerModalBody(activeItem)}</ModalBody>
			</Modal>
		</div>
	);
};
