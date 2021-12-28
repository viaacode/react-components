import { DefaultComponentProps } from '../../../types';
import { EnglishContentType } from '../../../types/avo.types';

export interface MenuSearchResultItemInfo {
	label: string;
	id: string | number;
	type: EnglishContentType;
}

export interface MenuSearchResultContentProps extends DefaultComponentProps {
	menuItems: MenuSearchResultItemInfo[];
	noResultsLabel?: string;
	onClick?: (menuItemId: string | number) => void;
}
