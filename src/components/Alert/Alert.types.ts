import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface AlertProps extends DefaultComponentProps {
	title?: string;
	content: ReactNode;
	icon?: ReactNode;
}
