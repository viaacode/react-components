import type { ReactNode } from 'react';

import type { DefaultComponentProps, HTMLInputAttrs } from '../../types';

export interface RadioButtonProps extends DefaultComponentProps, HTMLInputAttrs {
	children?: React.ReactNode;
	label?: ReactNode;
}
