import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { selectOptionsMock } from './__mocks__/select.js';
import Select from './Select.js';
import type { SelectProps } from './Select.types.js';

const renderSelect = ({ ...rest }: Partial<SelectProps> = {}) => {
	return render(<Select {...rest} />);
};

describe('components/<Select />', () => {
	it('Should set the correct classNames', () => {
		const rootClassName = 'select-root';
		const className = 'select-class';
		const variants = 'variant';
		const { container } = renderSelect({ rootClassName, className, variants });

		const select = container.querySelector('select') as HTMLSelectElement;
		const selectContainer = select.parentElement;

		expect(selectContainer).toHaveClass(rootClassName, className, `${rootClassName}--${variants}`);
	});

	it('Should set select specific attributes', () => {
		const id = 'select-id';
		const name = 'select-name';
		const ariaLabel = 'select-aria';
		const { container } = renderSelect({ 'aria-label': ariaLabel, id, name });

		const select = container.querySelector('select') as HTMLSelectElement;
		expect(select).toHaveAttribute('id', id);
		expect(select).toHaveAttribute('name', name);
		expect(select).toHaveAttribute('aria-label', ariaLabel);
	});

	it('Should render a start icon when given', () => {
		const iconStartId = 'select-icon-start';
		const iconStart = <span data-testid={iconStartId} />;
		renderSelect({ iconStart });

		const selectStartIcon = screen.queryByTestId(iconStartId);
		expect(selectStartIcon).toBeInTheDocument();
		expect(selectStartIcon?.parentElement).toHaveClass('c-select__icon--start');
	});

	it('Should render an end icon when given', () => {
		const iconEndId = 'select-icon-end';
		const iconEnd = <span data-testid={iconEndId} />;
		renderSelect({ iconEnd });

		const selectEndIcon = screen.queryByTestId(iconEndId);
		expect(selectEndIcon).toBeInTheDocument();
		expect(selectEndIcon?.parentElement).toHaveClass('c-select__icon--end');
	});

	it('Should show options when given', () => {
		renderSelect({ options: selectOptionsMock });

		const option1 = screen.queryByText(selectOptionsMock[1].label);
		const option2 = screen.queryByText(selectOptionsMock[2].label);
		const option3 = screen.queryByText(selectOptionsMock[3].label);
		expect(option1).toBeInTheDocument();
		expect(option2).toBeInTheDocument();
		expect(option3).toBeInTheDocument();
	});

	it('Should call onChange when selecting an option', async () => {
		const onChange = jest.fn();
		const { container } = renderSelect({ options: selectOptionsMock, onChange, value: '' });

		const select = container.querySelector('.c-select__element') as HTMLSelectElement;
		await userEvent.selectOptions(select, selectOptionsMock[0].value);
		expect(onChange).toHaveBeenCalledTimes(1);
	});
});
