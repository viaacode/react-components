import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

type HTMLButtonAttrs = ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonProps extends DefaultComponentProps {
	ariaLabel?: string;
	autoHeight?: boolean;
	disabled?: boolean;
	icon?: ReactNode;
	iconStart?: ReactNode;
	iconEnd?: ReactNode;
	id?: HTMLButtonAttrs['id'];
	label?: string;
	title?: HTMLButtonAttrs['title'];
	type?: HTMLButtonAttrs['type'];
	onClick?(event: MouseEvent<HTMLButtonElement>): void;
}
