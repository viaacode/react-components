import type { CSSProperties, ReactNode } from 'react';
import type { OnAfterOpenCallback } from 'react-modal';

import type { DefaultComponentProps } from '../../types';
import type { ButtonProps } from '../Button';

export interface ModalProps extends DefaultComponentProps {
	children?: React.ReactNode;
	closeButtonProps?: ButtonProps;
	footer?: ReactNode;
	heading?: ReactNode;
	isOpen?: boolean;
	overlayStyle?: CSSProperties;
	title?: string;
	onClose?: () => void;
	onOpen?: OnAfterOpenCallback;
}
