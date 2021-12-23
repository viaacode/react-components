import { ButtonProps } from './BlockButtons';

export const BUTTONS_MOCK: ButtonProps[] = [
	{
		label: 'Knop 1',
		buttonAction: {
			type: 'EXTERNAL_LINK',
			value: 'http://google.com',
		},
	},
	{
		label: 'Knop 2',
		buttonAction: {
			type: 'ANCHOR_LINK',
			value: 'title-3',
		},
	},
];
