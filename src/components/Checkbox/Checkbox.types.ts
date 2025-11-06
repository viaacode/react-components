import type { ReactNode } from 'react';

import type { DefaultComponentProps, HTMLInputAttrs } from '../../types/index.js';

export interface CheckboxProps extends DefaultComponentProps, HTMLInputAttrs {
	children?: ReactNode;
	checkIcon?: ReactNode;
	label?: string | ReactNode;
	showSpinner?: boolean;
}
