import {
	autoUpdate,
	offset,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import { DropdownButton, DropdownContent } from './Dropdown.slots';
import type { DropdownProps } from './Dropdown.types';

import './Dropdown.scss';
import { useSlot } from '../../hooks';
import { bemCls, getVariantClasses } from '../../utils';
import { Button } from '../Button';
import { Menu } from '../Menu';

/**
 * This component provides a button that can show a flyout with some children inside it.
 * The PopperJS library is used to provide the positioning logic for the flyout element.
 *
 * The nomenclature within this library is as follows:
 * - The button with down-arrow is called the "reference"
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
		menuWidth = 'fit-trigger',
		onClose = () => null,
		onOpen = () => null,
		placement = 'bottom-start',
		searchMenu = false,
		triggerClassName,
		triggerWidth = 'fit-content',
		rootClassName: root = 'c-dropdown',
		variants,
		isDisabled,
	} = props;
	const { refs, floatingStyles, context } = useFloating({
		placement,
		open: isOpen,
		onOpenChange: (open) => {
			console.log('on open changed');
			open ? onOpen() : onClose();
		},
		whileElementsMounted: autoUpdate,
		middleware: [offset(10)],
	});

	const click = useClick(context);
	const dismiss = useDismiss(context);
	const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss]);

	const dropdownButtonSlot = useSlot(DropdownButton, children);
	const dropdownContentSlot = useSlot(DropdownContent, children);

	const bem = bemCls.bind(root);
	const rootCls = clsx(className, triggerClassName, root, getVariantClasses(root, variants), {
		[bem('trigger')]: triggerWidth === 'fit-content',
	});

	const triggerButton: ReactNode = dropdownButtonSlot || (
		<Button
			disabled={isDisabled}
			iconStart={icon}
			label={label}
			iconEnd={isOpen ? iconOpen : iconClosed}
		/>
	);

	return (
		<div className={clsx(menuClassName, menuRootClassName)}>
			<span
				ref={refs.setReference}
				style={{ display: 'inline-block' }}
				{...getReferenceProps()}
				className={rootCls}
			>
				{triggerButton}
			</span>
			<div
				ref={refs.setFloating}
				style={{
					display: 'inline-block',
					...floatingStyles,
					minWidth:
						menuWidth === 'fit-trigger'
							? refs.reference?.current?.getBoundingClientRect().width
							: 0,
				}}
				className={clsx(
					'c-dropdown',
					flyoutClassName,
					isOpen ? 'c-dropdown__content-open' : 'c-dropdown__content-closed'
				)}
				id={id}
				{...getFloatingProps()}
			>
				<Menu isOpen={isOpen} search={searchMenu}>
					{dropdownContentSlot || children}
				</Menu>
			</div>
		</div>
	);
};

export default Dropdown;
