import type { ReactNode } from 'react';

import type { DefaultComponentProps } from '../../types/index.js';

export interface AlertProps extends DefaultComponentProps {
	children?: ReactNode;
	id?: string;
	title?: ReactNode;
	content: ReactNode;
	icon?: ReactNode;
	closeIcon?: ReactNode;
	onClose?: (id?: string) => void;
}
