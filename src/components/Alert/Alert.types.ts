import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface AlertProps extends DefaultComponentProps {
	children?: React.ReactNode;
	id?: string;
	title?: string;
	content: ReactNode;
	icon?: ReactNode;
	closeIcon?: ReactNode;
	onClose?: (id?: string) => void;
}
