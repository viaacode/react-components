import type { ReactNode } from 'react';

import type { DefaultComponentProps } from '../../types/index.js';

export interface BadgeProps extends DefaultComponentProps {
	children?: React.ReactNode;
	text: string | ReactNode;
	type?: 'default' | 'success' | 'error' | 'dark';
}
