import { ReactNode, SelectHTMLAttributes } from 'react';

import { DefaultComponentProps } from '../../types';

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
