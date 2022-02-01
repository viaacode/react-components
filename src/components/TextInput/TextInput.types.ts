import { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';

import { DefaultComponentProps, HTMLInputAttrs } from '../../types';

export interface TextInputProps extends DefaultComponentProps, HTMLInputAttrs {
	iconEnd?: ReactNode;
	iconStart?: ReactNode;
	onContainerClick?: MouseEventHandler<HTMLInputElement>;
	onContainerKeyUp?: KeyboardEventHandler<HTMLInputElement>;
}
