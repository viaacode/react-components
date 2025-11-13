import type { RefTypes } from '../../types/index';

export const assignRef = <T>(ref: RefTypes<T>, newValue: T) => {
	if (typeof ref === 'function') {
		ref(newValue);
	} else if (ref) {
		ref.current = newValue;
	}
	return ref;
};

export const mergeRefs = <T>(refs: RefTypes<T>[]) => {
	return (newValue: T) => {
		for (const ref of refs) {
			assignRef(ref, newValue);
		}
	};
};
