import { render } from '@testing-library/react';
import MultiRange, { type MultiRangePropsSchema } from './MultiRange';

const renderMultiRange = ({ ...rest }: Partial<MultiRangePropsSchema> = {}) => {
	return render(<MultiRange {...rest} highlightColor="#f00" trackColor="#000" />);
};

describe('<MultiRange />', () => {
	it('Should pass on the id', () => {
		const id = 'some-test-id';

		const { container } = renderMultiRange({ id });
		const multiRangeComponent = container.querySelector(`#${id}`) as HTMLDivElement;

		expect(multiRangeComponent.id).toEqual(id);
	});

	it('Should set the correct classNames', () => {
		const id = 'some-test-id';
		const rootClassName = 'select-root';
		const className = 'select-class';
		const { container } = renderMultiRange({ id, rootClassName, className });

		const multiRangeComponent = container.querySelector(`#${id}`) as HTMLDivElement;

		expect(multiRangeComponent).toHaveClass(rootClassName, className);

		expect(container.querySelector('.select-root__track')).toBeTruthy();
		expect(container.querySelector('.select-root__track-highlight')).toBeTruthy();
		expect(container.querySelector('.select-root__thumb')).toBeTruthy();
		expect(container.querySelector('.select-root__number-input')).toBeFalsy();
	});

	it('Should contain multiple items with according classes', () => {
		const { container } = renderMultiRange({ showNumber: true });

		expect(container.querySelector('.c-input-range__track')).toBeTruthy();
		expect(container.querySelector('.c-input-range__track-highlight')).toBeTruthy();
		expect(container.querySelector('.c-input-range__thumb')).toBeTruthy();
		expect(container.querySelector('.c-input-range__number-input')).toBeTruthy();
	});

	it('Should be able to set the disabled state', () => {
		const { container } = renderMultiRange({ disabled: true });

		expect(container.querySelector('.c-input-range--disabled')).toBeTruthy();
	});
});
