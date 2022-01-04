export const getVariantClasses = (
	baseClass: string,
	variants?: string | string[],
	separator = '--'
): string[] => {
	if (!baseClass || !variants) {
		return [];
	}

	const variantsArray = Array.isArray(variants) ? variants : [variants];

	return variantsArray.map((variant) => `${baseClass}${separator}${variant}`);
};
