import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface MultiSelectProps extends DefaultComponentProps {
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
