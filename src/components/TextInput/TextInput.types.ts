import { InputHTMLAttributes, KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

type HTMLInputAttrs = InputHTMLAttributes<HTMLInputElement>;

export interface TextInputProps extends DefaultComponentProps, HTMLInputAttrs {
	iconEnd?: ReactNode;
	iconStart?: ReactNode;
	onContainerClick?: MouseEventHandler<HTMLInputElement>;
	onContainerKeyUp?: KeyboardEventHandler<HTMLInputElement>;
}
