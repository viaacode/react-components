import { action } from '../../helpers';
import { EnglishContentType } from '../../types';

export const MOCK_HEADER_PROPS = {
	title: 'De wasberen slaan op hol in Pairi Daiza.',
	showMetaData: false,
};
export const MOCK_HEADER_PROPS_FULL = {
	...MOCK_HEADER_PROPS,
	category: 'collection' as EnglishContentType,
	onClickTitle: action('Title clicked'),
	showMetaData: true,
	bookmarks: '12',
	views: '23',
};
