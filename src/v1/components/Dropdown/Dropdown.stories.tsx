import { storiesOf } from '@storybook/react';
import React, { cloneElement, ReactElement, useState } from 'react';

import { action } from '../../helpers';
import { IconNameSchema } from '../Icon/Icon.types';
import { MenuContent } from '../Menu/MenuContent/MenuContent';

import { Dropdown } from './Dropdown';

const menuItems = [
	{ label: 'Aluminium', id: 'aluminium' },
	{ label: 'Cadmium', id: 'cadmium' },
	{ label: 'Dubnium', id: 'dubnium' },
	{ label: 'Potassium', id: 'potassium' },
];

const menuItemsWithIcons = [
	{ ...menuItems[0], label: 'Aluminium with an icon', icon: 'circle' as IconNameSchema },
	{ ...menuItems[1], label: 'Cadmium with an icon', icon: 'box' as IconNameSchema },
	{ ...menuItems[2], label: 'Dubnium with an icon', icon: 'square' as IconNameSchema },
	{ ...menuItems[3], label: 'Potassium with an icon', icon: 'triangle' as IconNameSchema },
];

const DropdownStoryComponent = ({ children }: { children: ReactElement }) => {
	const [isOpen, setOpen] = useState(false);

	const open = () => {
		action('onOpen')();
		setOpen(true);
	};

	const close = () => {
		action('onClose')();
		setOpen(false);
	};

	return cloneElement(children, {
		isOpen,
		onOpen: open,
		onClose: close,
	});
};

storiesOf('v1/components/Dropdown', module)
	.addParameters({ jest: ['Dropdown'] })
	.add('Dropdown', () => (
		<DropdownStoryComponent>
			<Dropdown label="Show options" isOpen={false}>
				<MenuContent menuItems={menuItems} />
			</Dropdown>
		</DropdownStoryComponent>
	))
	.add('Dropdown fit menu content', () => (
		<DropdownStoryComponent>
			<Dropdown label="Show options" isOpen={false} menuWidth="fit-content">
				<MenuContent menuItems={menuItemsWithIcons} />
			</Dropdown>
		</DropdownStoryComponent>
	))
	.add('Dropdown full width', () => (
		<DropdownStoryComponent>
			<Dropdown label="Show options" isOpen={false} triggerWidth="full-width">
				<MenuContent menuItems={menuItems} />
			</Dropdown>
		</DropdownStoryComponent>
	))
	.add('Dropdown up', () => (
		<div style={{ paddingTop: '200px' }}>
			<DropdownStoryComponent>
				<Dropdown label="Show options" isOpen={false} placement={'top'}>
					<MenuContent menuItems={menuItemsWithIcons} />
				</Dropdown>
			</DropdownStoryComponent>
		</div>
	))
	.add('Dropdown bottom-start', () => (
		<DropdownStoryComponent>
			<Dropdown
				label="Show options"
				menuWidth="fit-content"
				isOpen={false}
				placement={'bottom-start'}
			>
				<MenuContent menuItems={menuItemsWithIcons} />
			</Dropdown>
		</DropdownStoryComponent>
	))
	.add('Dropdown bottom-end', () => (
		<DropdownStoryComponent>
			<Dropdown
				label="Show options"
				menuWidth="fit-content"
				isOpen={false}
				placement={'bottom-end'}
			>
				<MenuContent menuItems={menuItems} />
			</Dropdown>
		</DropdownStoryComponent>
	))
	.add('Dropdown top-start', () => (
		<div style={{ paddingTop: '200px' }}>
			<DropdownStoryComponent>
				<Dropdown
					label="Show options"
					menuWidth="fit-content"
					isOpen={false}
					placement={'top-start'}
				>
					<MenuContent menuItems={menuItemsWithIcons} />
				</Dropdown>
			</DropdownStoryComponent>
		</div>
	))
	.add('Dropdown top-end', () => (
		<div style={{ paddingTop: '200px' }}>
			<DropdownStoryComponent>
				<Dropdown
					label="Show options"
					menuWidth="fit-content"
					isOpen={false}
					placement={'top-end'}
				>
					<MenuContent menuItems={menuItems} />
				</Dropdown>
			</DropdownStoryComponent>
		</div>
	));
