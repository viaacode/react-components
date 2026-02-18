import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { PropsWithChildren } from 'react';

import { Button } from '../Button';

import Dropdown from './Dropdown';
import { DropdownButton, DropdownContent } from './Dropdown.slots';
import type { DropdownProps } from './Dropdown.types';

const renderDropdown = ({ children, ...rest }: PropsWithChildren<DropdownProps>) => {
	return render(<Dropdown {...rest}>{children}</Dropdown>);
};

describe('<Dropdown />', () => {
	it('Should be able to render', async () => {
		const label = 'Show options';
		const isOpen = true;
		const childLabel = 'Content item';
		const children = <div>{childLabel}</div>;
		renderDropdown({ children, label, isOpen, id: 'test-id-3' });

		const dropdownLabel = await waitFor(() => screen.getByText(label));
		const dropdownContent = await waitFor(() => screen.getByText(childLabel));
		expect(dropdownLabel).toBeInTheDocument();
		expect(dropdownContent).toBeInTheDocument();
	});

	it('Should render correctly with `isOpen = false`', async () => {
		const label = 'Show options';
		const isOpen = false;
		const children = <div>content item</div>;
		const { container } = renderDropdown({ children, label, isOpen, id: 'test-id-3' });

		const dropdownContent = await waitFor(() =>
			container.querySelector('.c-menu--visible--default')
		);
		expect(dropdownContent).toBeInTheDocument;
	});

	it('Shouldrender correctly with `isOpen = true`', async () => {
		const label = 'Show options';
		const isOpen = true;
		const children = <div>content item</div>;
		const { container } = renderDropdown({ children, label, isOpen, id: 'test-id-3' });

		const dropdownContent = await waitFor(() => container.querySelector('.c-menu--default'));
		const dropdownContentvisible = await waitFor(() =>
			container.querySelector('.c-menu--visible--default')
		);
		expect(dropdownContent).toBeInTheDocument();
		expect(dropdownContentvisible).toBeInTheDocument();
	});

	it('Should call `onOpen` when clicking the button (and `isOpen = false`)', async () => {
		const onOpen = jest.fn();

		const label = 'Show options';
		const isOpen = false;
		const children = <div>content item</div>;
		const { getByText } = renderDropdown({ children, label, isOpen, onOpen, id: 'test-id-3' });

		const button = await waitFor(() => getByText(label));
		fireEvent.click(button);

		waitFor(() => expect(onOpen).toHaveBeenCalledTimes(1));
	});

	it('Should call `onClose` when clicking the button (and `isOpen = true`)', async () => {
		const onClose = jest.fn();

		const label = 'Show options';
		const isOpen = true;
		const children = <div>content item</div>;
		const { getByText } = renderDropdown({ children, label, isOpen, onClose, id: 'test-id-3' });

		const button = await waitFor(() => getByText(label));
		fireEvent.click(button);

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('Should set the correct className', async () => {
		const label = 'Show options';
		const isOpen = true;
		const children = <div>content item</div>;
		const customClass = 'custom-class';
		const customVariants = ['small', 'outline'];
		const { container } = renderDropdown({
			children,
			isOpen,
			label,
			className: customClass,
			variants: customVariants,
			id: 'test-id-4',
		});

		const dropdownRoot = await waitFor(() => container.querySelector('.c-dropdown'));
		expect(dropdownRoot).toHaveClass('c-dropdown');
		expect(dropdownRoot).toHaveClass(customClass);
		expect(dropdownRoot).toHaveClass(`c-dropdown--${customVariants[0]}`);
		expect(dropdownRoot).toHaveClass(`c-dropdown--${customVariants[1]}`);
	});

	it('Should correctly pass `label`', async () => {
		const label = 'Show options';
		const isOpen = true;
		const children = <div>content item</div>;
		const { container } = renderDropdown({ children, label, isOpen, id: 'test-id-3' });

		const button = await waitFor(() => container.querySelector('.c-button'));

		expect(button?.textContent).toEqual(label);
	});

	it('Should correctly render slots', async () => {
		const label = 'Show options';
		const isOpen = true;
		const children = (
			<>
				<DropdownButton>
					<Button label={label} />
				</DropdownButton>
				<DropdownContent>
					<div className="firstItem">One</div>
					<div>Two</div>
					<div>Three</div>
					<div>Four</div>
					<div>Five</div>
				</DropdownContent>
				;
			</>
		);
		const { container } = renderDropdown({ children, isOpen, id: 'test-id-3' });

		const button = await waitFor(() => screen.getByText(label));
		const content = await waitFor(() => container.querySelector('.firstItem'));

		expect(button).toBeInTheDocument();
		expect(content?.textContent).toEqual('One');
	});

	it('Should correctly pass triggerWidth', async () => {
		const label = 'Show options';
		const isOpen = true;
		const children = <div>content item</div>;
		const triggerWidthFullWidth = 'full-width';
		const triggerWidthFitContent = 'fit-content';
		const dropdownFullWidth = renderDropdown({
			children,
			label,
			isOpen,
			triggerWidth: triggerWidthFullWidth,
			id: 'test-id-1',
		});
		const dropdownFitContent = renderDropdown({
			children,
			label,
			isOpen,
			triggerWidth: triggerWidthFitContent,
			id: 'test-id-2',
		});

		const dropdownFullWidthRoot = await waitFor(() =>
			dropdownFullWidth.container.querySelector('.c-dropdown')
		);
		const dropdownFitContentRoot = await waitFor(() =>
			dropdownFitContent.container.querySelector('.c-dropdown')
		);

		expect(dropdownFullWidthRoot).not.toHaveClass('c-dropdown__trigger');
		expect(dropdownFitContentRoot).toHaveClass('c-dropdown__trigger');
	});
});
