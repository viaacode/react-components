import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface CardProps extends DefaultComponentProps {
	edge?: 'zinc' | 'none';
	image?: ReactNode;
	mode?: 'light' | 'dark';
	offset?: boolean;
	onClick?: () => void;
	orientation?: 'horizontal' | 'vertical' | 'vertical--at-md' | 'horizontal--at-md';
	padding?: 'both' | 'content' | 'vertical' | 'none';
	shadow?: boolean;
	subtitle?: ReactNode;
	tags?: ReactNode;
	title?: ReactNode;
	toolbar?: ReactNode;
}
