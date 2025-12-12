export const clamp = (
	number: number,
	boundOne: number | undefined,
	boundTwo: number | undefined
) => {
	let usableBoundOne = boundOne;
	let usableBoundTwo = boundTwo;

	if (boundTwo === undefined) {
		usableBoundTwo = usableBoundOne;
		usableBoundOne = undefined;
	}

	let result = number;

	if (usableBoundTwo !== undefined) {
		result = number <= usableBoundTwo ? number : usableBoundTwo;
	}
	if (usableBoundOne !== undefined) {
		result = number >= usableBoundOne ? number : usableBoundOne;
	}

	return result;
};
