import { KeyboardEvent, MouseEvent, ReactNode } from 'react';

import { DefaultComponentProps, VariantsProp } from '../../types';

export interface TagOption {
	active?: boolean;
	disabled?: boolean;
	id: string | number;
	label: string | ReactNode;
	variants?: VariantsProp;
}

export interface TagListProps extends DefaultComponentProps {
	closeIcon?: ReactNode;
	tags: TagOption[];
	onTagClosed?: (tagId: string | number, clickEvent: MouseEvent | KeyboardEvent) => void;
	onTagClicked?: (tagId: string | number, clickEvent: MouseEvent | KeyboardEvent) => void;
}
