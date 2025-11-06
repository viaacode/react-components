import type { ReactNode, SelectHTMLAttributes } from 'react';

import type { DefaultComponentProps } from '../../types/index.js';

type HTMLSelectAttrs = SelectHTMLAttributes<HTMLSelectElement>;

export interface SelectProps extends DefaultComponentProps, HTMLSelectAttrs {
	children?: React.ReactNode;
	iconEnd?: ReactNode;
	iconStart?: ReactNode;
	options?: SelectOption[];
}

export interface SelectOption {
	disabled?: boolean;
	label: string;
	value: string;
}
