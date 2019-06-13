import { get, isUndefined } from 'lodash-es';
import PopperJS, { Data, ModifierFn } from 'popper.js';
import React, { FunctionComponent, ReactNode, useState } from 'react';
import { Manager, Popper, Reference } from 'react-popper';
import { Icon } from '../..';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useKeyPress } from '../../hooks/useKeyPress';

export interface DropdownProps {
	label: string;
	placement?:
		| 'auto'
		| 'auto-start'
		| 'auto-end'
		| 'top'
		| 'top-start'
		| 'top-end'
		| 'right'
		| 'right-start'
		| 'right-end'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'left'
		| 'left-start'
		| 'left-end';
	autoSize?: boolean; // defaults to false, meaning: the flyout with will be the same as the reference element
	children: ReactNode;
}

/**
 * This component provides a button that can show a flyout with some children inside of it.
 * The PopperJS library is used to provide the positioning logic for the flyout element.
 *
 * The nomenclature within this library is as follows:
 * - The button with down arrow is called the "reference"
 * - The flyout element that contains the children is called the "popper"
 */
export const Dropdown: FunctionComponent<DropdownProps> = ({
	label,
	placement = 'top-start',
	autoSize = false,
	children,
}: DropdownProps) => {
	const [isOpen, setOpen] = useState(false);

	let dropdownButton: HTMLButtonElement | null = null;
	let dropdownFlyout: HTMLDivElement | null = null;

	/**
	 * Check if passed element is part of the component
	 * @param elem
	 */
	const isPartOfElement = (elem: Element | null): boolean => {
		return Boolean(
			elem &&
				(!dropdownButton || !dropdownButton.contains(elem)) &&
				(!dropdownFlyout || !dropdownFlyout.contains(elem))
		);
	};

	/**
	 * Toggles the flyout elements visibility if no boolean is passed
	 * If you pass "true", the flyout will be set to visible, even if it was visible before the call
	 * If you pass "false" the flyout will be hidden, even if it was hidden before the call
	 * @param shouldOpen
	 */
	const toggleOpen = (shouldOpen: boolean = !isOpen) => {
		setOpen(shouldOpen);
	};

	/**
	 * We let popper calculate all the required styles, then we modify them a little based on the autoSize settings
	 * @param data
	 * @param options
	 */
	const computeStyle = (data: Data, options: Object) => {
		const computeStylesFn: ModifierFn = get(PopperJS, 'Defaults.modifiers.computeStyle.fn');
		if (!computeStylesFn) {
			// TODO show error
			return data;
		}
		const newData = computeStylesFn(data, options);
		if (!autoSize) {
			// Make the width off the popper the same size as the reference element
			newData.styles.width = `${newData.offsets.reference.width}px`;
		}
		newData.styles.overflow = 'hidden';
		return newData;
	};

	const modifiers = {
		computeStyle: {
			fn: computeStyle,
		},
	};

	useKeyPress('Escape', () => toggleOpen(false));
	useClickOutside(isPartOfElement, () => toggleOpen(false));

	return (
		<Manager>
			<Reference>
				{({ ref }) => (
					<button
						className="c-button c-button--secondary"
						ref={reference => {
							dropdownButton = reference;
							ref(reference);
						}}
						onClick={() => toggleOpen()}
					>
						<div className="c-button__content">
							<div className="c-button__label">{label}</div>
							<Icon name={isOpen ? 'caret-up' : 'caret-down'} size="small" type="arrows" />
						</div>
					</button>
				)}
			</Reference>
			<Popper placement={placement} modifiers={modifiers}>
				{({ ref, style, placement }) => (
					<div
						className={`c-menu${isOpen ? ' c-menu--visible' : ''}`}
						ref={reference => {
							dropdownFlyout = reference;
							ref(reference);
						}}
						data-placement={placement}
						style={style}
					>
						{children}
					</div>
				)}
			</Popper>
		</Manager>
	);
};
