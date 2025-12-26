import type { VariantsProp } from '../../types';

export const getVariantsArray = (variants?: VariantsProp): string[] => {
	if (!variants) {
		return [];
	}

	return Array.isArray(variants) ? variants : [variants];
};

export const getVariantClasses = (
	baseClass: string,
	variants?: VariantsProp,
	separator = '--'
): string[] => {
	if (!baseClass || !variants) {
		return [];
	}

	const variantsArray = getVariantsArray(variants);

	return variantsArray.map((variant) => `${baseClass}${separator}${variant}`);
};
