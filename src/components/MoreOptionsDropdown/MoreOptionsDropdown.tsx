import type { FunctionComponent } from 'react';
import { Button } from '../Button';
import Dropdown from '../Dropdown/Dropdown';
import { DropdownButton, DropdownContent } from '../Dropdown/Dropdown.slots';
import { MenuContent } from '../Menu/MenuContent';
import type { MoreOptionsDropdownPropsSchema } from './MoreOptionsDropdown.types';

export const MoreOptionsDropdown: FunctionComponent<MoreOptionsDropdownPropsSchema> = ({
	id,
	isOpen,
	onOpen,
	onClose,
	menuItems,
	label = 'meer opties',
	onOptionClicked,
	icon,
}) => {
	const toggle = () => {
		if (isOpen) {
			onClose();
		} else {
			onOpen();
		}
	};

	return !!menuItems && !!menuItems.length ? (
		<Dropdown
			id={`${id}__more-options-dropdown`}
			isOpen={isOpen}
			menuWidth="fit-content"
			onOpen={onOpen}
			onClose={onClose}
			placement="bottom-end"
		>
			<DropdownButton>
				<Button icon={icon} ariaLabel={label} title={label} variants="secundary" onClick={toggle} />
			</DropdownButton>
			<DropdownContent>
				<MenuContent menuItems={menuItems} onClick={onOptionClicked} />
			</DropdownContent>
		</Dropdown>
	) : null;
};
