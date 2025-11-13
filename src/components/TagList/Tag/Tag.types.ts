import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';

import type { DefaultComponentProps } from '../../../types/index';

export interface TagProps extends DefaultComponentProps {
	children?: React.ReactNode;
	active?: boolean;
	closeIcon?: ReactNode;
	/**
	 * Define a custom closeButton replacing the internal <button> element
	 * You will have to define your own custom logic for the event handlers
	 */
	closeButton?: ReactNode;
	disabled?: boolean;
	id: string | number;
	label: string | ReactNode;
	onClick?: (id: string | number, e: TagEvents<HTMLSpanElement>) => void;
	onClose?: (id: string | number, e: TagEvents<HTMLButtonElement>) => void;
}

export type TagEvents<Element extends HTMLElement> = KeyboardEvent<Element> | MouseEvent<Element>;
