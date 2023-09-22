import { useCallback, useState } from 'react';

export function useCallbackRef<HTMLElement>(
	element?: HTMLElement
): [HTMLElement | null, (ref: HTMLElement | null) => void] {
	const [node, setNode] = useState<HTMLElement | null>(element || null);

	const ref = useCallback((node: HTMLElement | null) => {
		if (node !== null) {
			setNode(node);
		}
	}, []);

	return [node, ref];
}
