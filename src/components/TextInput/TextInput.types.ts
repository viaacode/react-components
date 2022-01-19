import React, { ChangeEvent, FocusEvent, KeyboardEvent, ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

type InputType = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';

export interface TextInputProps extends DefaultComponentProps {
	ariaLabel?: string;
	disabled?: boolean;
	iconEnd?: ReactNode;
	iconStart?: ReactNode;
	id?: string;
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	onClick?: (event: React.MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void;
	onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
	placeholder?: string;
	type?: InputType;
	value?: string;
}
