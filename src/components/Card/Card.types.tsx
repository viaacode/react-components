import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface CardProps extends DefaultComponentProps {
	edge?: 'zinc' | 'none';
	image?: ReactNode;
	mode?: 'light' | 'dark';
	offset?: boolean;
	orientation?: 'horizontal' | 'vertical';
	padding?: 'both' | 'content' | 'vertical' | 'none';
	shadow?: boolean;
	subtitle?: ReactNode;
	title?: ReactNode;
	toolbar?: ReactNode;
}
