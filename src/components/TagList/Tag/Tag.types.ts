import { KeyboardEvent, MouseEvent, ReactNode } from 'react';

import { DefaultComponentProps } from '../../../types';

export interface TagProps extends DefaultComponentProps {
	active?: boolean;
	closeIcon?: ReactNode;
	closeButton?: ReactNode;
	disabled?: boolean;
	id: string | number;
	label: string | ReactNode;
	onClick?: (id: string | number, e: TagEvents<HTMLSpanElement>) => void;
	onClose?: (id: string | number, e: TagEvents<HTMLButtonElement>) => void;
}

export type TagEvents<Element extends HTMLElement> = KeyboardEvent<Element> | MouseEvent<Element>;
