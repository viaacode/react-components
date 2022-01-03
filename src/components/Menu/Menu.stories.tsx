import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Menu from './Menu';
import MenuSearchResultContent from './MenuSearchResultContent/MenuSearchResultContent';
import {
	menuItems,
	menuItemsWithDivider,
	menuItemsWithIcons,
	menuItemsWithSearch,
} from './__mocks__';

export default {
	title: 'Components/Dropdown',
	component: Menu,
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

const TemplateSearch: ComponentStory<typeof Menu> = (args) => (
	<Menu {...args}>
		<MenuSearchResultContent menuItems={menuItemsWithSearch} />
	</Menu>
);

export const Default = Template.bind({});
Default.args = {
	menuItems: menuItems,
	onClick: action('clicked menu item'),
};

export const WithIcons = Template.bind({});
WithIcons.args = {
	menuItems: menuItemsWithIcons,
};

export const WithDividers = Template.bind({});
WithDividers.args = {
	menuItems: menuItemsWithDivider,
};

export const WithSearchResults = TemplateSearch.bind({});
WithSearchResults.args = {
	search: true,
};

export const NoResults = Template.bind({});
NoResults.args = {
	menuItems: [],
	noResultsLabel: 'No results',
};
