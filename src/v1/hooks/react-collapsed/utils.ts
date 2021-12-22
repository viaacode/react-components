/* tslint:disable */
export const noop = () => null;

export function getElementHeight(el: any) {
	if (!el || !el.current) {
		return 'auto';
	}
	return el.current.scrollHeight;
}

// Helper function for render props. Sets a function to be called, plus any additional functions passed in
export const callAll =
	(...fns: any) =>
	(...args: any) =>
		fns.forEach((fn: any) => fn && fn(...args));

export const defaultTransitionStyles = {
	transitionDuration: '500ms',
	transitionTimingFunction: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
};

export function joinTransitionProperties(string: string) {
	if (string) {
		const styles = ['height'];
		styles.push(...string.split(', '));
		return styles.join(', ');
	}
	return 'height';
}

export function makeTransitionStyles({
	expandStyles = defaultTransitionStyles,
	collapseStyles = defaultTransitionStyles,
}: any) {
	return {
		expandStyles: {
			...expandStyles,
			transitionProperty: joinTransitionProperties(expandStyles.transitionProperty),
		},
		collapseStyles: {
			...collapseStyles,
			transitionProperty: joinTransitionProperties(collapseStyles.transitionProperty),
		},
	};
}
