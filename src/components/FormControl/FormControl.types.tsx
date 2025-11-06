import type { ReactNode } from 'react';

import type { DefaultComponentProps } from '../../types/index.js';

export interface FormControlProps extends DefaultComponentProps {
	children?: React.ReactNode;
	id?: string;
	label?: ReactNode;
	errors?: ReactNode[];
	disabled?: boolean;
	suffix?: ReactNode;
}
