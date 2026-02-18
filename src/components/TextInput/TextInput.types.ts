import type {
	ChangeEventHandler,
	FocusEventHandler,
	KeyboardEvent,
	KeyboardEventHandler,
	MouseEventHandler,
	ReactNode,
} from 'react';

import type { DefaultComponentProps } from '../../types';

export interface TextInputProps extends DefaultComponentProps {
	id: string;
	name?: string;
	children?: ReactNode;
	iconEnd?: ReactNode | ((onClickIcon?: () => void) => ReactNode) | null;
	iconStart?: ReactNode | ((onClickIcon?: () => void) => ReactNode) | null;
	onContainerClick?: MouseEventHandler<HTMLInputElement>;
	onContainerKeyUp?: KeyboardEventHandler<HTMLInputElement>;
	ariaLabel: string;
	onEnter?: (evt: KeyboardEvent) => void;
	onBlur?: FocusEventHandler<HTMLInputElement>;
	value: string | undefined;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	onClick?: MouseEventHandler<HTMLInputElement>;
	type?: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url';
	disabled?: boolean;
	placeholder?: string;
	maxLength?: number;
	pattern?: string;
	step?: number;
	autoCapitalize?: 'characters' | 'none' | 'off' | 'sentences' | 'on' | 'words';
	autoComplete?: 'on' | 'off' | string;
	autoCorrect?: 'on' | 'off' | '';
	spellCheck?: boolean;
}
