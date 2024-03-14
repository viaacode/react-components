import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface AlertProps extends DefaultComponentProps {
	children?: ReactNode;
	id?: string;
	title?: ReactNode;
	content: ReactNode;
	icon?: ReactNode;
	closeIcon?: ReactNode;
	onClose?: (id?: string) => void;
}
