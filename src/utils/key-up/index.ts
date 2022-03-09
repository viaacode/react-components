export const keysSpacebar = ['Spacebar', 'Space', ' '];
export const keysEnter = ['Enter'];
export const keysEscape = ['Esc', 'Escape'];

export const onKey = (e: { key: string }, keys: string[], callback?: () => void) => {
	if (!keys.includes(e.key)) {
		return;
	}

	callback?.();
};
