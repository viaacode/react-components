import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { usePopper } from 'react-popper';

import { useClickOutside, useKeyPress, useSlot } from '../../hooks';
import { bemCls, getVariantClasses } from '../../utils';
import { Button } from '../Button';
import { Menu } from '../Menu';

import './Dropdown.scss';
import { DropdownButton, DropdownContent } from './Dropdown.slots';
import { DropdownProps } from './Dropdown.types';

/**
 * This component provides a button that can show a flyout with some children inside of it.
 * The PopperJS library is used to provide the positioning logic for the flyout element.
 *
 * The nomenclature within this library is as follows:
 * - The button with down arrow is called the "reference"
 * - The flyout element that contains the children is called the "popper"
 */

const Dropdown: FC<DropdownProps> = ({
	children,
	className,
	icon,
	iconOpen,
	iconClosed,
	isOpen,
	label = '',
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
}) => {
	const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
	const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

	const dropdownButtonSlot = useSlot(DropdownButton, children);
	const dropdownContentSlot = useSlot(DropdownContent, children);

	const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
		placement,
	});

	const bem = bemCls.bind(root);
	const rootCls = clsx(className, triggerClassName, root, getVariantClasses(root, variants), {
		[bem('trigger')]: triggerWidth === 'fit-content',
	});

	const toggle = (openState = !isOpen) => {
		if (openState !== isOpen) {
			openState ? update?.().then(onOpen) : onClose();
		}
	};

	const toggleClosed = () => toggle(false);

	useKeyPress('Escape', toggleClosed);
	useClickOutside(popperElement as Element, toggleClosed, [referenceElement as Element]);

	return (
		<>
			{
				// Wrapper element should not be tabbable
				// eslint-disable-next-line jsx-a11y/no-static-element-interactions
				<div
					className={rootCls}
					onClick={() => toggle()}
					onKeyUp={() => null}
					ref={setReferenceElement}
				>
					{dropdownButtonSlot || (
						<Button
							iconStart={icon}
							label={label}
							iconEnd={isOpen ? iconOpen : iconClosed}
						/>
					)}
				</div>
			}
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
