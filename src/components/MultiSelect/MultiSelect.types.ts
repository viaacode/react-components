import type { ReactNode } from 'react';

import type { DefaultComponentProps } from '../../types/index';

export interface MultiSelectProps extends DefaultComponentProps {
	children?: React.ReactNode;
	label: string;
	options: MultiSelectOption[];
	onChange: (checked: boolean, id: string) => void;
	variant?: string;
	iconOpen: ReactNode;
	iconClosed: ReactNode;
	iconCheck: ReactNode;
}

export interface MultiSelectOption {
	id: string;
	label: string;
	checked: boolean;
}
