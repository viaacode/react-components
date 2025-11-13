import type { ReactNode } from 'react';

import type { DefaultComponentProps } from '../../../types/index';

export interface TabProps extends DefaultComponentProps {
	children?: React.ReactNode;
	active?: boolean;
	icon?: ReactNode;
	id: string | number;
	label: string | ReactNode;
	onClick?: () => void;
	onKeyPress?: () => void;
}
