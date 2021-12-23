import { getVariantClasses } from './variant-classes';

const mockClass = 'my-class';
const mockVariants = ['active', 'disabled'];

describe('utils/variant-classes', () => {
	it('Should return modifier classes based on a given base class', () => {
		const variantClasses = getVariantClasses(mockClass, mockVariants);

		expect(variantClasses[0]).toBe(`${mockClass}--${mockVariants[0]}`);
		expect(variantClasses[1]).toBe(`${mockClass}--${mockVariants[1]}`);
	});

	it('Should accept a custom separator', () => {
		const separator = '-';
		const variantClasses = getVariantClasses(mockClass, mockVariants, separator);

		expect(variantClasses[0]).toBe(`${mockClass}${separator}${mockVariants[0]}`);
		expect(variantClasses[1]).toBe(`${mockClass}${separator}${mockVariants[1]}`);
	});

	it('Should return an empty array if no variants are given', () => {
		const variantClasses = getVariantClasses(mockClass);

		expect(Array.isArray(variantClasses)).toBeTruthy();
		expect(variantClasses).toHaveLength(0);
	});
});
