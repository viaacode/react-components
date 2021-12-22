import classnames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import { BlockHeading } from '../../content-blocks/BlockHeading/BlockHeading';
import { useSlot } from '../../hooks/useSlot';
import { DefaultProps, EnglishContentType, translateContentType } from '../../types';
import { Container, ContainerPropsSchema } from '../Container/Container';
import { Flex } from '../Flex/Flex';
import { HeaderContentType } from '../HeaderContentType/HeaderContentType';
import { MetaData } from '../MetaData/MetaData';
import { MetaDataItem } from '../MetaData/MetaDataItem/MetaDataItem';
import { Spacer } from '../Spacer/Spacer';
import { Toolbar } from '../Toolbar/Toolbar';
import { ToolbarLeft, ToolbarRight } from '../Toolbar/Toolbar.slots';
import { ToolbarItem } from '../Toolbar/ToolbarItem/ToolbarItem';

import './Header.scss';
import { HeaderAvatar, HeaderButtons, HeaderTags } from './Header.slots';

export interface HeaderPropsSchema extends DefaultProps {
	bookmarks?: string;
	category?: EnglishContentType;
	children?: ReactNode;
	containerSize?: ContainerPropsSchema['size'];
	onClickTitle?: () => void;
	showMetaData: boolean;
	title: string;
	views?: string;
}

export const Header: FunctionComponent<HeaderPropsSchema> = ({
	bookmarks,
	category,
	children,
	className,
	containerSize,
	onClickTitle,
	showMetaData,
	title,
	views,
}) => {
	const buttonSlot = useSlot(HeaderButtons, children);
	const avatarSlot = useSlot(HeaderAvatar, children);
	const tagSlot = useSlot(HeaderTags, children);

	return (
		<Container
			className={classnames('c-header', className)}
			background="alt"
			mode="vertical"
			size={containerSize}
		>
			<Container mode="horizontal">
				<Toolbar autoHeight>
					<ToolbarLeft>
						<ToolbarItem>
							{showMetaData && !!category && (
								<Spacer margin="bottom-small">
									<MetaData spaced={true} category={category}>
										<MetaDataItem>
											<HeaderContentType
												category={category}
												label={translateContentType(category, 'en', false)}
											/>
										</MetaDataItem>
										{views && <MetaDataItem icon="eye" label={views} />}
										{bookmarks && (
											<MetaDataItem icon="bookmark" label={bookmarks} />
										)}
									</MetaData>
								</Spacer>
							)}
							<BlockHeading
								className={classnames('u-m-0', { 'u-clickable': onClickTitle })}
								type="h2"
								onClick={onClickTitle}
							>
								{title}
							</BlockHeading>
							{(avatarSlot || tagSlot) && (
								<Spacer margin="top-small">
									<Flex spaced="regular">
										{avatarSlot}
										{tagSlot}
									</Flex>
								</Spacer>
							)}
						</ToolbarItem>
					</ToolbarLeft>
					{buttonSlot && (
						<ToolbarRight>
							<ToolbarItem>{buttonSlot}</ToolbarItem>
						</ToolbarRight>
					)}
				</Toolbar>
			</Container>
		</Container>
	);
};
