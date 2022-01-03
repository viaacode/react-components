import React from 'react';

import { MenuItemInfo } from '../MenuContent/MenuContent.types';
import { MenuSearchResultItemInfo } from '../MenuSearchResultContent/MenuSearchResultContent.types';

export const menuItems = [
	{ label: 'Aluminium', id: 'aluminium' },
	{ label: 'Cadmium', id: 'cadmium' },
	{ label: 'Dubnium', id: 'dubnium' },
	{ label: 'Potassium', id: 'potassium' },
];

export const menuItemsWithIcons: MenuItemInfo[] = [
	{ ...menuItems[0], icon: <span className="o-svg-icon">icon</span> },
	{ ...menuItems[1], icon: <span className="o-svg-icon">icon</span> },
	{ ...menuItems[2], icon: <span className="o-svg-icon">icon</span> },
	{ ...menuItems[3], icon: <span className="o-svg-icon">icon</span> },
];

export const menuItemsWithDivider = [
	[{ ...menuItems[0] }, { ...menuItems[1] }],
	[{ ...menuItems[2] }],
	[{ ...menuItems[3] }],
];

export const menuItemsWithSearch: MenuSearchResultItemInfo[] = [
	{
		label: 'WK Voetbal',
		id: 0,
		type: 'collection',
		icon: <span className="o-svg-icon">icon</span>,
	},
	{
		label: 'Wereldkampioenschap Voetbal 2018',
		id: 1,
		type: 'collection',
		icon: <span className="o-svg-icon">icon</span>,
	},
	{
		label: 'Journaal: voetbij bij jongeren',
		id: 2,
		type: 'bundle',
		icon: <span className="o-svg-icon">icon</span>,
	},
	{
		label: 'Op één: voetbal',
		id: 3,
		type: 'video',
		icon: <span className="o-svg-icon">icon</span>,
	},
	{
		label: 'Ketnet online: interview wereldbeker voetbal',
		id: 4,
		type: 'audio',
		icon: <span className="o-svg-icon">icon</span>,
	},
];
