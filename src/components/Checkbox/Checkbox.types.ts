import { ChangeEvent, ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface CheckboxProps extends DefaultComponentProps {
	checked?: boolean;
	checkIcon?: ReactNode;
	disabled?: boolean;
	id?: string;
	label: string | ReactNode;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
