import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface AlertProps extends DefaultComponentProps {
	id?: string;
	title?: string;
	content: ReactNode;
	icon?: ReactNode;
	closeIcon?: ReactNode;
	onClose?: (id?: string) => void;
}
