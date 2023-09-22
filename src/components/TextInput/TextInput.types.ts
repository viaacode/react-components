import { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';

import { DefaultComponentProps, HTMLInputAttrs } from '../../types';

export interface TextInputProps extends DefaultComponentProps, HTMLInputAttrs {
	children?: ReactNode;
	iconEnd?: ReactNode | (() => ReactNode) | null;
	iconStart?: ReactNode | (() => ReactNode) | null;
	onContainerClick?: MouseEventHandler<HTMLInputElement>;
	onContainerKeyUp?: KeyboardEventHandler<HTMLInputElement>;
}
