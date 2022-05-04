import { CSSProperties, ReactNode } from 'react';
import { OnAfterOpenCallback } from 'react-modal';

import { DefaultComponentProps } from '../../types';
import { ButtonProps } from '../Button';

export interface ModalProps extends DefaultComponentProps {
	closeButtonProps?: ButtonProps;
	footer?: ReactNode;
	heading?: ReactNode;
	isOpen?: boolean;
	overlayStyle?: CSSProperties;
	title?: string;
	onClose?: () => void;
	onOpen?: OnAfterOpenCallback;
}
