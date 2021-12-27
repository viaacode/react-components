import clsx from 'clsx';
import React, { FunctionComponent, useState } from 'react';
import { usePopper } from 'react-popper';

import { useClickOutside } from '../../hooks/use-click-outside';
import { useKeyPress } from '../../hooks/use-key-press';
import { useSlot } from '../../hooks/use-slot';
import { bemCls } from '../../utils/bem-class';
import { getVariantClasses } from '../../utils/variant-classes';
import { Icon } from '../../v1/components/Icon/Icon';
import Button from '../Button/Button';
import Menu from '../Menu/Menu';

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

// TODO
// icon
// element
const Dropdown: FunctionComponent<DropdownProps> = ({
	children,
	className,
	icon,
	isOpen,
	label = '',
	menuClassName,
	menuRootClassName,
	// TODO re-enable this without causing an infinite render loop
	// https://github.com/popperjs/popper-core/issues/794#issuecomment-736727000
	// menuWidth = 'fit-trigger',
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

	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement,
		// modifiers:
		// 	menuWidth === 'fit-trigger'
		// 		? [
		// 				{
		// 					name: 'matchReferenceSize',
		// 					enabled: true,
		// 					effect({ state }) {
		// 						state.elements.popper.style.width = `${
		// 							(state.elements.reference as HTMLElement).offsetWidth
		// 						}px`;
		// 					},
		// 					phase: 'beforeWrite',
		// 					requires: ['computeStyles'],
		// 				},
		// 		  ]
		// 		: [],
	});

	const bem = bemCls.bind(root);
	const rootCls = clsx(className, triggerClassName, root, getVariantClasses(root, variants), {
		[bem('trigger')]: triggerWidth === 'fit-content',
	});

	const toggle = (openState = !isOpen) => {
		if (openState !== isOpen) {
			openState ? onOpen() : onClose();
		}
	};

	// TODO
	// const renderIcon = (iconNode: ReactNode) => <span>{iconNode}</span>;

	const toggleClosed = () => toggle(false);

	useKeyPress('Escape', toggleClosed);
	useClickOutside(popperElement as Element, toggleClosed, [referenceElement as Element]);

	return (
		<>
			<div
				className={rootCls}
				onClick={() => toggle()}
				onKeyPress={(e) => (e.key === 'Space' ? toggle() : () => null)}
				role="button"
				tabIndex={0}
				ref={setReferenceElement}
			>
				{dropdownButtonSlot || (
					<Button type="button">
						<div className="c-button__content">
							{/* {icon && <Icon name={icon} />} */}
							{label && <div className="c-button__label">{label}</div>}
							{!icon && (
								<Icon
									name={isOpen ? 'caret-up' : 'caret-down'}
									size="small"
									type="arrows"
								/>
							)}
						</div>
					</Button>
				)}
			</div>

			<div
				ref={setPopperElement}
				style={styles.popper}
				{...attributes.popper}
				className={isOpen ? 'c-dropdown__content-open' : 'c-dropdown__content-closed'}
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
