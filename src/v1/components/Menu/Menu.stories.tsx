import { storiesOf } from '@storybook/react';
import React from 'react';

import { action } from '../../helpers';

import { Menu } from './Menu';
import {
	menuItems,
	menuItemsWithDivider,
	menuItemsWithIcons,
	menuItemsWithSearch,
} from './Menu.mocks';
import { MenuSearchResultContent } from './MenuSearchResultContent/MenuSearchResultContent';

storiesOf('v1/components/Menu', module)
	.addParameters({ jest: ['Menu'] })
	.add('Menu', () => <Menu menuItems={menuItems} onClick={action('clicked menu item')} />)
	.add('Menu with icons', () => <Menu menuItems={menuItemsWithIcons} />)
	.add('Menu with dividers', () => <Menu menuItems={menuItemsWithDivider} />)
	.add('Menu with search results', () => (
		<Menu search>
			<MenuSearchResultContent menuItems={menuItemsWithSearch} />
		</Menu>
	))
	.add('Menu no results', () => <Menu menuItems={[]} noResultsLabel="No results" />);
