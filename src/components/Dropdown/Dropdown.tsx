import clsx from 'clsx';
import {
	cloneElement,
	type FC,
	isValidElement,
	type MouseEvent,
	type ReactElement,
	type ReactNode,
	useState,
} from 'react';
import { usePopper } from 'react-popper';

import { useClickOutside, useKeyPress, useSlot } from '../../hooks';
import { bemCls, getVariantClasses, keysEnter, keysSpacebar, onKey } from '../../utils';
import { Button } from '../Button';
import { Menu } from '../Menu/index';

import './Dropdown.scss';
import { DropdownButton, DropdownContent } from './Dropdown.slots';
import type { DropdownProps } from './Dropdown.types';

/**
 * This component provides a button that can show a flyout with some children inside of it.
 * The PopperJS library is used to provide the positioning logic for the flyout element.
 *
 * The nomenclature within this library is as follows:
 * - The button with down arrow is called the "reference"
 * - The flyout element that contains the children is called the "popper"
 */

const Dropdown: FC<DropdownProps> = ({ children, ...props }) => {
	const {
		className,
		icon,
		iconOpen,
		iconClosed,
		isOpen,
		label = '',
		id,
		flyoutClassName,
		menuClassName,
		menuRootClassName,
		// FIXED re-enable this without causing an infinite render loop
		// https://github.com/popperjs/popper-core/issues/794#issuecomment-736727000
		// SOLUTION https://github.com/floating-ui/floating-ui/issues/794#issuecomment-822432452
		menuWidth = 'fit-trigger',
		onClose = () => null,
		onOpen = () => null,
		placement = 'bottom-start',
		searchMenu = false,
		triggerClassName,
		triggerWidth = 'fit-content',
		rootClassName: root = 'c-dropdown',
		variants,
		popper,
		isDisabled,
	} = props;
	const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
	const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

	const dropdownButtonSlot = useSlot(DropdownButton, children);
	const dropdownContentSlot = useSlot(DropdownContent, children);

	const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
		...popper,
		placement,
	});

	const bem = bemCls.bind(root);
	const rootCls = clsx(className, triggerClassName, root, getVariantClasses(root, variants), {
		[bem('trigger')]: triggerWidth === 'fit-content',
	});

	const toggle = (openState = !isOpen) => {
		if (isDisabled) {
			return;
		}

		if (openState !== isOpen) {
			openState ? update?.().then(onOpen) : onClose();
		}
	};

	const toggleClosed = () => toggle(false);

	useKeyPress('Escape', toggleClosed);
	useClickOutside(
		popperElement as Element,
		toggleClosed,
		referenceElement ? [referenceElement as Element] : []
	);

	const triggerButton: ReactNode = dropdownButtonSlot || (
		<Button
			disabled={isDisabled}
			iconStart={icon}
			label={label}
			iconEnd={isOpen ? iconOpen : iconClosed}
		/>
	);

	let triggerWithProps: ReactNode;
	if (isValidElement(triggerButton)) {
		triggerWithProps = cloneElement(triggerButton as ReactElement, {
			className: clsx(rootCls, (triggerButton as ReactElement).props.className),
			onClick: (e: MouseEvent) => {
				(triggerButton as ReactElement).props.onClick?.(e);
				toggle();
			},
			onKeyUp: (e: KeyboardEvent) => {
				(triggerButton as ReactElement).props.onKeyUp?.(e);
				onKey(e, [...keysEnter, ...keysSpacebar], toggle);
			},
			ref: setReferenceElement,
			'aria-controls': id,
			'aria-expanded': isOpen,
		});
	} else {
		triggerWithProps = triggerButton;
	}
	return (
		<>
			{triggerWithProps}
			<div
				ref={setPopperElement}
				style={{
					...styles.popper,
					minWidth: menuWidth === 'fit-trigger' ? referenceElement?.scrollWidth : 0,
				}}
				{...attributes.popper}
				className={clsx(
					flyoutClassName,
					isOpen ? 'c-dropdown__content-open' : 'c-dropdown__content-closed'
				)}
				id={id}
			>
				<Menu
					className={menuClassName}
					rootClassName={menuRootClassName}
					isOpen={isOpen}
					search={searchMenu}
				>
					{dropdownContentSlot || children}
				</Menu>
			</div>
		</>
	);
};

export default Dropdown;
