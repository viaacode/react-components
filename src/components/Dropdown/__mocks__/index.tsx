import { IconNameSchema } from '../../../v1/components/Icon/Icon.types';

export const menuItems = [
	{ label: 'Aluminium', id: 'aluminium' },
	{ label: 'Cadmium', id: 'cadmium' },
	{ label: 'Dubnium', id: 'dubnium' },
	{ label: 'Potassium', id: 'potassium' },
];

export const menuItemsWithIcons = [
	{ ...menuItems[0], label: 'Aluminium with an icon', icon: 'circle' as IconNameSchema },
	{ ...menuItems[1], label: 'Cadmium with an icon', icon: 'box' as IconNameSchema },
	{ ...menuItems[2], label: 'Dubnium with an icon', icon: 'square' as IconNameSchema },
	{ ...menuItems[3], label: 'Potassium with an icon', icon: 'triangle' as IconNameSchema },
];
