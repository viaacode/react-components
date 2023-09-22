import { ReactNode } from 'react';

import { TextInputProps } from '../TextInput';

export type StopPropagationObject = { stopPropagation: () => void };

export interface ContentInputProps extends TextInputProps {
	children?: React.ReactNode;
	align?: 'left' | 'right';
	nodeCancel?: ReactNode;
	nodeSubmit?: ReactNode;
	onCancel?: () => void;
	onClose?: () => void;
	onConfirm?: (value: string | ReadonlyArray<string> | number) => Promise<void>;
	onOpen?: () => void;
	iconEnd?: ReactNode | (() => ReactNode) | null;
	iconStart?: ReactNode | (() => ReactNode) | null;
}
