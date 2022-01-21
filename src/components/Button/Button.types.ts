import { ButtonHTMLAttributes, ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

type HTMLButtonAttrs = ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonProps extends DefaultComponentProps, HTMLButtonAttrs {
	disabled?: boolean;
	icon?: ReactNode;
	iconStart?: ReactNode;
	iconEnd?: ReactNode;
	label?: string | ReactNode;
}
