import { ButtonHTMLAttributes, ReactNode, RefAttributes, RefObject } from 'react';

import { DefaultComponentProps } from '../../types';

type HTMLButtonAttrs = ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonProps
	extends DefaultComponentProps,
		HTMLButtonAttrs,
		RefAttributes<HTMLButtonElement> {
	disabled?: boolean;
	icon?: ReactNode;
	iconStart?: ReactNode;
	iconEnd?: ReactNode;
	label?: string | ReactNode;
	buttonRef?: RefObject<HTMLButtonElement>;
	toolTipText?: string;
}
