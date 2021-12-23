import { ChangeEvent, FocusEvent } from 'react';

import { DefaultComponentProps } from '../../types';

export interface TextAreaProps extends DefaultComponentProps {
	autoHeight?: boolean;
	disabled?: boolean;
	id?: string;
	name?: string;
	placeholder?: string;
	rows?: number;
	value?: string;
	onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
	onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}
