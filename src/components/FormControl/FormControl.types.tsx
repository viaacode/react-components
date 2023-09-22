import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface FormControlProps extends DefaultComponentProps {
	children?: React.ReactNode;
	id?: string;
	label?: ReactNode;
	errors?: ReactNode[];
	disabled?: boolean;
	suffix?: ReactNode;
}
