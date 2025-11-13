import type { ReactNode } from 'react';

import type { DefaultComponentProps, HTMLInputAttrs } from '../../types/index';

export interface RadioButtonProps extends DefaultComponentProps, HTMLInputAttrs {
	children?: React.ReactNode;
	label?: ReactNode;
}
