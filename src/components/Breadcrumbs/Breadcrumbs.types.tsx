import type { FC, ReactNode } from 'react';

import type { DefaultComponentProps } from '../../types/index';

export interface BreadcrumbsProps extends DefaultComponentProps {
	children?: React.ReactNode;
	items: Breadcrumb[];
	icon: ReactNode;
	linkComponent: FC<{
		href: string;
		className?: string;
		children: ReactNode | string;
		style: Record<string, string | undefined>;
	}>;
	foregroundColor?: string;
}

export interface Breadcrumb {
	label: string;
	to: string;
}
