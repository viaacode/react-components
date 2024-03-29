import { ReactNode } from 'react';

import { DefaultComponentProps, HTMLInputAttrs } from '../../types';

export interface RadioButtonProps extends DefaultComponentProps, HTMLInputAttrs {
	children?: React.ReactNode;
	label?: ReactNode;
}
