import { ReactNode } from 'react';

import { TextInputProps } from '../TextInput';

export type StopPropagationObject = { stopPropagation: () => void };
export type StopPropagationFunction = (evt: StopPropagationObject) => void;

export interface ContentInputProps extends TextInputProps {
	children?: ReactNode;
	align?: 'left' | 'right';
	nodeCancel?: ReactNode;
	nodeSubmit?: ReactNode;
	onCancel?: () => void;
	onClose?: () => void;
	onConfirm?: (value: string | ReadonlyArray<string> | number) => Promise<void>;
	onOpen?: () => void;
	iconEnd?: ReactNode | ((onClickIcon?: StopPropagationFunction) => ReactNode) | null;
	iconStart?: ReactNode | ((onClickIcon?: StopPropagationFunction) => ReactNode) | null;
}
