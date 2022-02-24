import { ReactNode } from 'react';

import { TextInputProps } from '../TextInput';

export interface ContentInputProps extends TextInputProps {
	align?: 'left' | 'right';
	nodeCancel?: ReactNode;
	nodeSubmit?: ReactNode;
	onCancel?: () => void;
	onClose?: () => void;
	onConfirm?: (value: string | ReadonlyArray<string> | number) => void;
	onOpen?: () => void;
}
