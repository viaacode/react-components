import type { ReactNode } from 'react';

import type { DefaultComponentProps, HTMLInputAttrs } from '../../types/index.js';

export interface RadioButtonProps extends DefaultComponentProps, HTMLInputAttrs {
	children?: React.ReactNode;
	label?: ReactNode;
}
