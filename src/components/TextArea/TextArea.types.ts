import type { ChangeEventHandler, FocusEventHandler, MouseEventHandler, ReactNode } from 'react';

import type { DefaultComponentProps } from '../../types';

export interface TextAreaProps extends DefaultComponentProps {
	children?: ReactNode;
	autoHeight?: boolean;
	rows?: number;
	id: string;
	name?: string;
	ariaLabel: string;
	onBlur?: FocusEventHandler<HTMLTextAreaElement>;
	value: string | undefined;
	onChange?: ChangeEventHandler<HTMLTextAreaElement>;
	onClick?: MouseEventHandler<HTMLTextAreaElement>;
	disabled?: boolean;
	placeholder?: string;
	maxLength?: number;
}
