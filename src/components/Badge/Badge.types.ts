import { DefaultComponentProps } from '../../types';

export interface BadgeProps extends DefaultComponentProps {
	text: string;
	type?: 'default' | 'success' | 'error';
}
