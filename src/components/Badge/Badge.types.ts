import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface BadgeProps extends DefaultComponentProps {
	children?: React.ReactNode;
	text: string | ReactNode;
	type?: 'default' | 'success' | 'error' | 'dark';
}
