import type { ReactNode } from 'react';

import type { DefaultComponentProps } from '../../types/index';

export interface CheckboxListProps<T> extends DefaultComponentProps {
	children?: React.ReactNode;
	items: Array<T & { label: string; value: unknown; checked?: boolean }>;
	onItemClick: (checked: boolean, value: unknown) => void;
	itemClassName?: string;
	checkIcon?: ReactNode;
}
