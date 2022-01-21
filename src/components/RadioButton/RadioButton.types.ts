import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface RadioButtonProps extends DefaultComponentProps {
	checked?: boolean;
	disabled?: boolean;
	id?: string;
	label: string | ReactNode;
	onChange?: () => void;
}
