import React from 'react';

import { Icon } from '../../v1/components/Icon/Icon';

import { MenuItemInfo } from './MenuContent/MenuContent.types';
import { MenuSearchResultItemInfo } from './MenuSearchResultContent/MenuSearchResultContent.types';

export const menuItems = [
	{ label: 'Aluminium', id: 'aluminium' },
	{ label: 'Cadmium', id: 'cadmium' },
	{ label: 'Dubnium', id: 'dubnium' },
	{ label: 'Potassium', id: 'potassium' },
];

export const menuItemsWithIcons: MenuItemInfo[] = [
	{ ...menuItems[0], icon: <Icon name="circle" /> },
	{ ...menuItems[1], icon: <Icon name="box" /> },
	{ ...menuItems[2], icon: <Icon name="square" /> },
	{ ...menuItems[3], icon: <Icon name="triangle" /> },
];

export const menuItemsWithDivider = [
	[{ ...menuItems[0] }, { ...menuItems[1] }],
	[{ ...menuItems[2] }],
	[{ ...menuItems[3] }],
];

export const menuItemsWithSearch: MenuSearchResultItemInfo[] = [
	{ label: 'WK Voetbal', id: 0, type: 'collection' },
	{ label: 'Wereldkampioenschap Voetbal 2018', id: 1, type: 'collection' },
	{ label: 'Journaal: voetbij bij jongeren', id: 2, type: 'bundle' },
	{ label: 'Op één: voetbal', id: 3, type: 'video' },
	{ label: 'Ketnet online: interview wereldbeker voetbal', id: 4, type: 'audio' },
];
