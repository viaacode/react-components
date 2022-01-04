import React from 'react';

export const menuItems = [
	{ label: 'Aluminium', id: 'aluminium' },
	{ label: 'Cadmium', id: 'cadmium' },
	{ label: 'Dubnium', id: 'dubnium' },
	{ label: 'Potassium', id: 'potassium' },
];

export const menuItemsWithIcons = [
	{
		...menuItems[0],
		label: 'Aluminium with an icon',
		icon: <span className="o-svg-icon">icon</span>,
	},
	{
		...menuItems[1],
		label: 'Cadmium with an icon',
		icon: <span className="o-svg-icon">icon</span>,
	},
	{
		...menuItems[2],
		label: 'Dubnium with an icon',
		icon: <span className="o-svg-icon">icon</span>,
	},
	{
		...menuItems[3],
		label: 'Potassium with an icon',
		icon: <span className="o-svg-icon">icon</span>,
	},
];
