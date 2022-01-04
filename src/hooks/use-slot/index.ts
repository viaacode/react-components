import { ReactElement, ReactNode, ReactNodeArray } from 'react';

export function useSlot<T>(type: T, children: ReactNode): ReactNode {
	const slots: ReactNodeArray = Array.isArray(children) ? children : [children];
	const element: ReactElement = slots.find((c: any) => c && c.type === type) as ReactElement;

	if (element && element.props.children) {
		return element.props.children;
	}

	return null;
}
