import { KeyboardEvent, MouseEvent, ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface TagOption {
	label: string | ReactNode;
	id: string | number;
	color?: string;
	active?: boolean;
	disabled?: boolean;
}

export interface TagListProps extends DefaultComponentProps {
	tags: TagOption[];
	swatches?: boolean;
	bordered?: boolean;
	closable?: boolean;
	selectable?: boolean;
	onTagClosed?: (tagId: string | number, clickEvent: MouseEvent | KeyboardEvent) => void;
	onTagClicked?: (tagId: string | number, clickEvent: MouseEvent | KeyboardEvent) => void;
	closeIcon?: ReactNode;
}
