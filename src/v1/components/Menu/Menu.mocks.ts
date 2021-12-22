import { MenuItemInfoSchema } from './MenuContent/MenuContent';
import { MenuSearchResultItemInfoSchema } from './MenuSearchResultContent/MenuSearchResultContent';

export const menuItems = [
	{ label: 'Aluminium', id: 'aluminium' },
	{ label: 'Cadmium', id: 'cadmium' },
	{ label: 'Dubnium', id: 'dubnium' },
	{ label: 'Potassium', id: 'potassium' },
];

export const menuItemsWithIcons: MenuItemInfoSchema[] = [
	{ ...menuItems[0], icon: 'circle' },
	{ ...menuItems[1], icon: 'box' },
	{ ...menuItems[2], icon: 'square' },
	{ ...menuItems[3], icon: 'triangle' },
];

export const menuItemsWithDivider = [
	[{ ...menuItems[0] }, { ...menuItems[1] }],
	[{ ...menuItems[2] }],
	[{ ...menuItems[3] }],
];

export const menuItemsWithSearch: MenuSearchResultItemInfoSchema[] = [
	{ label: 'WK Voetbal', id: 0, type: 'collection' },
	{ label: 'Wereldkampioenschap Voetbal 2018', id: 1, type: 'collection' },
	{ label: 'Journaal: voetbij bij jongeren', id: 2, type: 'bundle' },
	{ label: 'Op één: voetbal', id: 3, type: 'video' },
	{ label: 'Ketnet online: interview wereldbeker voetbal', id: 4, type: 'audio' },
];
