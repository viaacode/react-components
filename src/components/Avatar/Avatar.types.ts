import type { ReactNode } from 'react';

import type { DefaultComponentProps } from '../../types';

export interface AvatarProps extends DefaultComponentProps {
	text?: ReactNode;
	children?: ReactNode;
}
