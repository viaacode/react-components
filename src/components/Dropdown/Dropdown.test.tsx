import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { type PropsWithChildren, useState } from 'react';

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

	it('Should render correctly with `shiftPadding` unset (default, unshifted positioning)', async () => {
		// Regression: `shift` middleware used to be added unconditionally for every Dropdown
		// consumer, silently changing positioning behaviour for consumers that never opted in.
		const label = 'Show options';
		const children = <div>content item</div>;
		const { container } = renderDropdown({ children, label, isOpen: true, id: 'test-id-5' });

		const dropdownContent = await waitFor(() => container.querySelector('.c-dropdown'));
		expect(dropdownContent).toBeInTheDocument();
	});

	it('Should render correctly with `shiftPadding` set', async () => {
		const label = 'Show options';
		const children = <div>content item</div>;
		const { container } = renderDropdown({
			children,
			label,
			isOpen: true,
			shiftPadding: 8,
			id: 'test-id-6',
		});

		const dropdownContent = await waitFor(() => container.querySelector('.c-dropdown'));
		expect(dropdownContent).toBeInTheDocument();
	});
});

describe('<Dropdown /> keyboard behaviour', () => {
	const renderMenu = (keyboard: DropdownProps['keyboard'], isOpen = true) =>
		render(
			<Dropdown id="kb" isOpen={isOpen} keyboard={keyboard}>
				<DropdownButton>
					<Button label="Open" />
				</DropdownButton>
				<DropdownContent>
					<button type="button">One</button>
					<button type="button">Two</button>
					<button type="button">Three</button>
				</DropdownContent>
			</Dropdown>
		);

	/** `isOpen` is controlled by the consumer, so opening/closing has to go through their state. */
	const Controlled = ({ keyboard }: { keyboard: DropdownProps['keyboard'] }) => {
		const [isOpen, setIsOpen] = useState(false);
		return (
			<>
				<button type="button">before</button>
				<Dropdown
					id="kb"
					isOpen={isOpen}
					keyboard={keyboard}
					onOpen={() => setIsOpen(true)}
					onClose={() => setIsOpen(false)}
				>
					<DropdownButton>
						<Button label="Open" />
					</DropdownButton>
					<DropdownContent>
						<button type="button">One</button>
						<button type="button">Two</button>
					</DropdownContent>
				</Dropdown>
			</>
		);
	};

	it('moves focus between the options on ArrowDown/ArrowUp, wrapping at both ends', () => {
		renderMenu('menu');
		const [one, two, three] = ['One', 'Two', 'Three'].map((label) => screen.getByText(label));

		one.focus();
		fireEvent.keyDown(one, { key: 'ArrowDown' });
		expect(two).toHaveFocus();

		fireEvent.keyDown(two, { key: 'ArrowUp' });
		expect(one).toHaveFocus();

		// Wrap: up from the first lands on the last, down from the last on the first.
		fireEvent.keyDown(one, { key: 'ArrowUp' });
		expect(three).toHaveFocus();
		fireEvent.keyDown(three, { key: 'ArrowDown' });
		expect(one).toHaveFocus();
	});

	it('jumps to the first and last option on Home/End', () => {
		renderMenu('menu');
		const two = screen.getByText('Two');

		two.focus();
		fireEvent.keyDown(two, { key: 'End' });
		expect(screen.getByText('Three')).toHaveFocus();

		fireEvent.keyDown(screen.getByText('Three'), { key: 'Home' });
		expect(screen.getByText('One')).toHaveFocus();
	});

	// The FlowPlayer control bar seeks and changes volume on arrow keys, so a menu that let them
	// through would navigate and move the playhead at once.
	it('stops a handled key from reaching an enclosing widget', () => {
		const onKeyDown = jest.fn();
		render(
			// biome-ignore lint/a11y/noStaticElementInteractions: stands in for an enclosing widget's own key handling
			<div onKeyDown={onKeyDown}>
				<Dropdown id="kb" isOpen keyboard="menu">
					<DropdownButton>
						<Button label="Open" />
					</DropdownButton>
					<DropdownContent>
						<button type="button">One</button>
						<button type="button">Two</button>
					</DropdownContent>
				</Dropdown>
			</div>
		);

		const one = screen.getByText('One');
		one.focus();
		fireEvent.keyDown(one, { key: 'ArrowDown' });
		expect(screen.getByText('Two')).toHaveFocus();
		expect(onKeyDown).not.toHaveBeenCalled();
	});

	it('leaves unhandled keys to the content', () => {
		renderMenu('menu');
		const one = screen.getByText('One');
		one.focus();

		fireEvent.keyDown(one, { key: 'ArrowRight' });

		expect(one).toHaveFocus();
	});

	const getTrigger = () => screen.getByRole('button', { name: 'Open' });

	it('opens onto the first option on ArrowDown and the last on ArrowUp', () => {
		render(<Controlled keyboard="menu" />);
		const trigger = getTrigger();

		trigger.focus();
		fireEvent.keyDown(trigger, { key: 'ArrowDown' });
		expect(screen.getByText('One')).toHaveFocus();

		fireEvent.keyDown(screen.getByText('One'), { key: 'Escape' });
		trigger.focus();
		fireEvent.keyDown(trigger, { key: 'ArrowUp' });
		expect(screen.getByText('Two')).toHaveFocus();
	});

	it('moves focus into the flyout on open in dialog mode, without claiming the arrow keys', () => {
		render(<Controlled keyboard="dialog" />);
		const trigger = getTrigger();

		fireEvent.click(trigger);
		expect(screen.getByText('One')).toHaveFocus();

		// A slider or text field inside keeps its own arrows.
		fireEvent.keyDown(screen.getByText('One'), { key: 'ArrowDown' });
		expect(screen.getByText('One')).toHaveFocus();
	});

	it('leaves focus alone on open by default', () => {
		render(<Controlled keyboard={undefined} />);
		const trigger = getTrigger();

		trigger.focus();
		fireEvent.click(trigger);

		expect(trigger).toHaveFocus();
	});

	// Closing only hides the content, so focus left inside it would be dropped to <body> - the
	// keyboard user loses their place in the page entirely.
	it('returns focus to the trigger when it closes while focus is inside, in every mode', () => {
		for (const keyboard of ['none', 'dialog', 'menu'] as const) {
			const { unmount } = render(<Controlled keyboard={keyboard} />);
			const trigger = getTrigger();

			fireEvent.click(trigger);
			screen.getByText('One').focus();
			fireEvent.keyDown(screen.getByText('One'), { key: 'Escape' });

			expect(trigger).toHaveFocus();
			unmount();
		}
	});

	it('does not pull focus back when the flyout closes with focus already elsewhere', () => {
		render(<Controlled keyboard="menu" />);
		const trigger = getTrigger();
		const outside = screen.getByText('before');

		fireEvent.click(trigger);
		screen.getByText('One').focus();
		outside.focus();
		fireEvent.click(trigger);

		expect(outside).toHaveFocus();
	});
});
