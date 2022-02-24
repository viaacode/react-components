import { ReactNode } from 'react';

import { TextInputProps } from '../TextInput';

export interface ContentInputProps extends TextInputProps {
	nodeCancel?: ReactNode;
	nodeSubmit?: ReactNode;
	onCancel?: () => void;
	onConfirm?: (value: string | ReadonlyArray<string> | number) => void;
	align?: 'left' | 'right';
}
