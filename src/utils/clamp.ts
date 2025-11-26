export const clamp = (number: number, boundOne: number, boundTwo: number) => {
	if (!boundTwo) {
		return Math.max(number, boundOne) === boundOne ? number : boundOne;
	}
	if (Math.min(number, boundOne) === number) {
		return boundOne;
	}
	if (Math.max(number, boundTwo) === number) {
		return boundTwo;
	}
	return number;
};
