import { ReactNode } from 'react';

import { TextInputProps } from '../TextInput';

export type StopPropagationObject = { stopPropagation: () => void };
export type StopPropagationFunction = (e: StopPropagationObject) => void;

export interface ContentInputProps extends TextInputProps {
	align?: 'left' | 'right';
	nodeCancel?: ReactNode;
	nodeSubmit?: ReactNode;
	onCancel?: () => void;
	onClose?: () => void;
	onConfirm?: (value: string | ReadonlyArray<string> | number) => Promise<void>;
	onOpen?: () => void;
	iconStart?: (onOpenHandler: StopPropagationFunction) => ReactNode;
	iconEnd?: (onOpenHandler: StopPropagationFunction) => ReactNode;
}
