import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../../types';

export interface TabProps extends DefaultComponentProps {
	active?: boolean;
	icon?: ReactNode;
	id: string | number;
	label: string | ReactNode;
	onClick?: () => void;
	onKeyPress?: () => void;
}
