import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface BreadcrumbsProps extends DefaultComponentProps {
	items: Breadcrumb[];
	icon: ReactNode;
}

export interface Breadcrumb {
	label: string;
	to: string;
}
