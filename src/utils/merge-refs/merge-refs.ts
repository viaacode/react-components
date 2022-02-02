import { RefTypes } from '../../types';

export const assignRef = <T>(ref: RefTypes<T>, newValue: T) => {
	if (typeof ref === 'function') {
		ref(newValue);
	} else if (ref) {
		ref.current = newValue;
	}
	return ref;
};

export const mergeRefs = <T>(refs: RefTypes<T>[]) => {
	return (newValue: T) => refs.forEach((ref) => assignRef(ref, newValue));
};
