import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface AvatarProps extends DefaultComponentProps {
	text?: ReactNode;
	children?: ReactNode;
}
