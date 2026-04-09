import type { ReactElement, ReactNode } from 'react';

export function useSlot<T>(type: T, children: ReactNode): ReactNode {
	const slots: ReactNode[] = Array.isArray(children) ? children : [children];
	const element: ReactElement<any> = slots.find(
		(c: any) => c && c.type === type
	) as ReactElement<any>;

	if (element?.props.children) {
		return element.props.children;
	}

	return null;
}
