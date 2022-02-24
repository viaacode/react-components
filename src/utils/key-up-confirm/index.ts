export const keyUpConfirm = (e: { key: string }, callback?: () => void) => {
	const codes = ['Spacebar', 'Space', ' ', 'Enter'];

	if (!codes.includes(e.key)) {
		return;
	}

	callback?.();
};
