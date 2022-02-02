import { ReactNode } from 'react';

import { DefaultComponentProps, HTMLInputAttrs } from '../../types';

export interface CheckboxProps extends DefaultComponentProps, HTMLInputAttrs {
	checkIcon?: ReactNode;
	label: string | ReactNode;
}
