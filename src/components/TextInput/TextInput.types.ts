import { ChangeEvent, FocusEvent, KeyboardEvent, ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

type InputType = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';

export interface TextInputProps extends DefaultComponentProps {
	ariaLabel?: string;
	disabled?: boolean;
	iconEnd?: ReactNode;
	iconStart?: ReactNode;
	id?: string;
	placeholder?: string;
	type?: InputType;
	value?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
	onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
}
