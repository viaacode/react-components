import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface BoxProps extends DefaultComponentProps {
	condensed?: boolean;
	backgroundColor?: 'gray' | 'soft-white' | 'white' | 'dark';
	children: ReactNode;
}
