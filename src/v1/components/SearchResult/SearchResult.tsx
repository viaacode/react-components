import classnames from 'classnames';
import { isNil, truncate } from 'lodash-es';
import React, { FunctionComponent, ReactNode, ReactText } from 'react';

import { useSlot } from '../../hooks/useSlot';
import { DefaultProps, EnglishContentType } from '../../types';
import { Flex } from '../Flex/Flex';
import { FlexItem } from '../Flex/FlexItem/FlexItem';
import { MetaData } from '../MetaData/MetaData';
import { MetaDataItem } from '../MetaData/MetaDataItem/MetaDataItem';
import { Spacer } from '../Spacer/Spacer';
import { TagList, TagOptionSchema } from '../TagList/TagList';
import { ToggleButton } from '../ToggleButton/ToggleButton';

import './SearchResult.scss';
import {
	SearchResultSubtitle,
	SearchResultThumbnail,
	SearchResultTitle,
} from './SearchResult.slots';

export interface SearchResultPropsSchema extends DefaultProps {
	children: ReactNode;
	type: EnglishContentType;
	thumbnailPath?: string;
	description?: string;
	maxDescriptionLength?: number;
	isBookmarked: boolean | null;
	date: string;
	bookmarkCount: number;
	viewCount: number;
	tags?: TagOptionSchema[];
	onToggleBookmark?: (active: boolean) => void;
	onTagClicked?: (tagId: string) => void;
}

export const SearchResult: FunctionComponent<SearchResultPropsSchema> = ({
	children,
	className,
	type,
	description = '',
	maxDescriptionLength = 300,
	isBookmarked,
	date,
	bookmarkCount,
	viewCount,
	tags = [],
	onToggleBookmark = () => null,
	onTagClicked = () => null,
}) => {
	const title = useSlot(SearchResultTitle, children);
	const subTitle = useSlot(SearchResultSubtitle, children);
	const thumbnail = useSlot(SearchResultThumbnail, children);

	return (
		<div className={classnames(className, 'c-search-result')}>
			<div className="c-search-result__image">{thumbnail}</div>
			<div className="c-search-result__content">
				<Flex align="start" justify="between">
					<FlexItem>
						<h2 className="c-search-result__title">{title}</h2>
						{subTitle}
					</FlexItem>
					{!isNil(isBookmarked) && (
						<FlexItem shrink>
							<div className="c-button-toolbar">
								<ToggleButton
									active={isBookmarked}
									icon="bookmark"
									onClick={(active: boolean) => onToggleBookmark(active)}
									ariaLabel="toggle bookmark"
								/>
							</div>
						</FlexItem>
					)}
				</Flex>
				<p className="c-search-result__description">
					{truncate(description, { length: maxDescriptionLength })}
				</p>
				<Spacer margin="bottom-small">
					<Flex justify="between" wrap>
						<MetaData category={type}>
							<MetaDataItem label={date} />
							<MetaDataItem label={String(viewCount)} icon="eye" />
							<MetaDataItem label={String(bookmarkCount)} icon="bookmark" />
						</MetaData>
						<TagList
							tags={tags}
							swatches={false}
							onTagClicked={(tagId: ReactText) => onTagClicked(tagId.toString())}
						/>
					</Flex>
				</Spacer>
			</div>
		</div>
	);
};
