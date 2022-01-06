import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface BadgeProps extends DefaultComponentProps {
	text: string | ReactNode;
	type?: 'default' | 'success' | 'error';
}
