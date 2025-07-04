import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { cloneElement, type ReactElement, useState } from 'react';

import { MenuContent } from '../Menu/MenuContent';

import Dropdown from './Dropdown';
import { DropdownContent } from './Dropdown.slots';
import { menuItems, menuItemsWithIcons } from './__mocks__/dropdown';

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

export default {
	title: 'Components/Dropdown',
	component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
	<DropdownStoryComponent>
		<Dropdown {...args}>
			<MenuContent menuItems={menuItems} />
		</Dropdown>
	</DropdownStoryComponent>
);

const TemplateWithIcons: ComponentStory<typeof Dropdown> = (args) => {
	const [multiChildren, setMulti] = useState(args.children);

	// Demonstrate what https://github.com/viaacode/react-components/commit/6ae18ae6ed1c055c32bf9d1f55f88fabd48d67f9 fixes
	// i.e. incorrect positioning when content grows after init
	const t = setTimeout(() => {
		setMulti(
			<>
				{args.children}
				{args.children}
			</>
		);

		clearTimeout(t);
	}, 1000);

	return (
		<div style={{ paddingTop: '200px' }}>
			<DropdownStoryComponent>
				<Dropdown {...args}>
					{multiChildren || <MenuContent menuItems={menuItemsWithIcons} />}
				</Dropdown>
			</DropdownStoryComponent>
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {
	label: 'Show Options',
	isOpen: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
	label: 'Show Options',
	isOpen: false,
	isDisabled: true,
};

export const FitMenuContent = Template.bind({});
FitMenuContent.args = {
	label: 'Show Options',
	isOpen: false,
	menuWidth: 'fit-content',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
	label: 'Show Options',
	isOpen: false,
	triggerWidth: 'full-width',
};

export const FitTrigger = Template.bind({});
FitTrigger.args = {
	label: 'Show Options',
	isOpen: false,
	menuWidth: 'fit-trigger',
};

export const DropdownUp = TemplateWithIcons.bind({});
DropdownUp.args = {
	label: 'Show Options',
	isOpen: false,
	placement: 'top',
};

export const DropdownBottomStart = TemplateWithIcons.bind({});
DropdownBottomStart.args = {
	label: 'Show Options',
	menuWidth: 'fit-content',
	isOpen: false,
	placement: 'bottom-start',
};

export const DropdownBottomEnd = TemplateWithIcons.bind({});
DropdownBottomEnd.args = {
	label: 'Show Options',
	menuWidth: 'fit-content',
	isOpen: false,
	placement: 'bottom-end',
};

export const DropdownTopStart = TemplateWithIcons.bind({});
DropdownTopStart.args = {
	label: 'Show Options',
	menuWidth: 'fit-content',
	isOpen: false,
	placement: 'top-start',
};

export const DropdownTopEnd = TemplateWithIcons.bind({});
DropdownTopEnd.args = {
	label: 'Show Options',
	menuWidth: 'fit-content',
	isOpen: false,
	placement: 'top-end',
};

export const DropdownWithLazyContent = TemplateWithIcons.bind({});
DropdownWithLazyContent.args = {
	label: 'Show Options',
	menuWidth: 'fit-content',
	isOpen: false,
	placement: 'right',
	children: (
		<DropdownContent>
			<div style={{ backgroundColor: 'hotpink', maxHeight: '100vh', overflow: 'auto' }}>
				<h1>One</h1>
			</div>
		</DropdownContent>
	),
};
