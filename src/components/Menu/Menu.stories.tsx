import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { action } from 'storybook/actions';

import Menu from './Menu.js';
import MenuSearchResultContent from './MenuSearchResultContent/MenuSearchResultContent.js';
import {
	menuItems,
	menuItemsWithDivider,
	menuItemsWithIcons,
	menuItemsWithSearch,
} from './__mocks__/menu.js';

const meta: Meta<typeof Menu> = {
	title: 'Components/Menu',
	component: Menu,
};
export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
	args: {
		menuItems: menuItems,
		onClick: action('clicked menu item'),
	},
};

export const WithIcons: Story = {
	args: {
		menuItems: menuItemsWithIcons,
	},
};

export const WithDividers: Story = {
	args: {
		menuItems: menuItemsWithDivider,
	},
};

export const WithSearchResults: Story = {
	args: {
		search: true,
	},
	render: (args) => (
		<Menu {...args}>
			<MenuSearchResultContent menuItems={menuItemsWithSearch} />
		</Menu>
	),
};

export const NoResults: Story = {
	args: {
		menuItems: [],
		noResultsLabel: 'No results',
	},
};
