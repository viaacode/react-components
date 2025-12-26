import type { Meta, StoryObj } from '@storybook/react-vite';
import { cloneElement, type ReactElement, useEffect, useState } from 'react';
import { action } from 'storybook/actions';

import { MenuContent } from '../Menu/MenuContent';
import { menuItems, menuItemsWithIcons } from './__mocks__/dropdown';
import Dropdown from './Dropdown';
import { DropdownContent } from './Dropdown.slots';

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

const meta: Meta<typeof Dropdown> = {
	title: 'Components/Dropdown',
	component: Dropdown,
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

const DefaultTemplate = (args: any) => (
	<DropdownStoryComponent>
		<Dropdown {...args}>
			<MenuContent menuItems={menuItems} />
		</Dropdown>
	</DropdownStoryComponent>
);

const TemplateWithIcons = (args: any) => {
	const [multiChildren, setMulti] = useState(args.children);
	useEffect(() => {
		const t = setTimeout(() => {
			setMulti(
				<>
					{args.children}
					{args.children}
				</>
			);
			clearTimeout(t);
		}, 1000);
		// eslint-disable-next-line
		return () => {};
	}, [args.children]);
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

export const Default: Story = {
	args: {
		label: 'Show Options',
		isOpen: false,
	},
	render: DefaultTemplate,
};

export const Disabled: Story = {
	args: {
		label: 'Show Options',
		isOpen: false,
		isDisabled: true,
	},
	render: DefaultTemplate,
};

export const FitMenuContent: Story = {
	args: {
		label: 'Show Options',
		isOpen: false,
		menuWidth: 'fit-content',
	},
	render: DefaultTemplate,
};

export const FullWidth: Story = {
	args: {
		label: 'Show Options',
		isOpen: false,
		triggerWidth: 'full-width',
	},
	render: DefaultTemplate,
};

export const FitTrigger: Story = {
	args: {
		label: 'Show Options',
		isOpen: false,
		menuWidth: 'fit-trigger',
	},
	render: DefaultTemplate,
};

export const DropdownUp: Story = {
	args: {
		label: 'Show Options',
		isOpen: false,
		placement: 'top',
	},
	render: TemplateWithIcons,
};

export const DropdownBottomStart: Story = {
	args: {
		label: 'Show Options',
		menuWidth: 'fit-content',
		isOpen: false,
		placement: 'bottom-start',
	},
	render: TemplateWithIcons,
};

export const DropdownBottomEnd: Story = {
	args: {
		label: 'Show Options',
		menuWidth: 'fit-content',
		isOpen: false,
		placement: 'bottom-end',
	},
	render: TemplateWithIcons,
};

export const DropdownTopStart: Story = {
	args: {
		label: 'Show Options',
		menuWidth: 'fit-content',
		isOpen: false,
		placement: 'top-start',
	},
	render: TemplateWithIcons,
};

export const DropdownTopEnd: Story = {
	args: {
		label: 'Show Options',
		menuWidth: 'fit-content',
		isOpen: false,
		placement: 'top-end',
	},
	render: TemplateWithIcons,
};

export const DropdownWithLazyContent: Story = {
	args: {
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
	},
	render: TemplateWithIcons,
};
