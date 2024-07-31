import { ButtonHTMLAttributes, ReactNode, RefAttributes, RefObject } from 'react';

import { DefaultComponentProps } from '../../types';

type HTMLButtonAttrs = ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonProps
	extends DefaultComponentProps,
		HTMLButtonAttrs,
		RefAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	disabled?: boolean;
	icon?: ReactNode;
	iconStart?: ReactNode;
	iconEnd?: ReactNode;
	label?: string | ReactNode;
	buttonRef?: RefObject<HTMLButtonElement>;
	tooltipText?: string;
	tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';
}
