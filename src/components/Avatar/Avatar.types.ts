import type { ReactNode } from 'react';

import type { DefaultComponentProps } from '../../types/index';

export interface AvatarProps extends DefaultComponentProps {
	text?: ReactNode;
	children?: ReactNode;
}
