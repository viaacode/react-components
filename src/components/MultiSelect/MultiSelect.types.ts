import type { ReactNode } from 'react';

import type { DefaultComponentProps, VariantsProp } from '../../types';

export interface MultiSelectProps extends DefaultComponentProps {
	children?: React.ReactNode;
	label: string;
	options: MultiSelectOption[];
	onChange: (checked: boolean, id: string) => void;
	variant?: string;
	iconOpen: ReactNode;
	iconClosed: ReactNode;
	iconCheck: ReactNode;
	checkboxHeader?: ReactNode;
	confirmOptions?: MultiSelectConfirmationOption;
	resetOptions?: MultiSelectConfirmationOption;
	id: string;
}

export interface MultiSelectOption {
	id: string;
	label: string;
	checked: boolean;
}

export interface MultiSelectConfirmationOption {
	label?: string;
	icon?: ReactNode;
	onClick?: (checked: string[]) => void;
	variants?: VariantsProp;
}
