import type { CSSProperties, ReactNode } from 'react';
import type { OnAfterOpenCallback } from 'react-modal';

import type { DefaultComponentProps } from '../../types/index';
import type { ButtonProps } from '../Button/index';

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
