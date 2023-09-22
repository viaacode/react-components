import { ReactNode } from 'react';

import { DefaultComponentProps, HTMLInputAttrs } from '../../types';

export interface CheckboxProps extends DefaultComponentProps, HTMLInputAttrs {
	children?: React.ReactNode;
	checkIcon?: ReactNode;
	label?: string | ReactNode;
}
