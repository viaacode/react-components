import { FC, ReactElement, ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface BreadcrumbsProps extends DefaultComponentProps {
	items: Breadcrumb[];
	icon: ReactNode;
	linkComponent: FC<{
		href: string;
		className?: string;
		children: ReactElement | string;
	}>;
}

export interface Breadcrumb {
	label: string;
	to: string;
}
