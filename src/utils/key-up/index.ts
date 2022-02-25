export const keyUpSpacebar = ['Spacebar', 'Space', ' '];
export const keyUpEnter = ['Enter'];

export const onKeyUp = (e: { key: string }, keys: string[], callback?: () => void) => {
	if (!keys.includes(e.key)) {
		return;
	}

	callback?.();
};
