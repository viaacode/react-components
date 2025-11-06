import type { ButtonHTMLAttributes, ReactNode, RefAttributes, RefObject } from 'react';

import type { DefaultComponentProps } from '../../types/index.js';

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
