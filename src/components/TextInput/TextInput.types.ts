import type { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';

import type { DefaultComponentProps, HTMLInputAttrs } from '../../types/index.js';

export interface TextInputProps extends DefaultComponentProps, HTMLInputAttrs {
	children?: ReactNode;
	iconEnd?: ReactNode | ((onClickIcon?: () => void) => ReactNode) | null;
	iconStart?: ReactNode | ((onClickIcon?: () => void) => ReactNode) | null;
	onContainerClick?: MouseEventHandler<HTMLInputElement>;
	onContainerKeyUp?: KeyboardEventHandler<HTMLInputElement>;
}
