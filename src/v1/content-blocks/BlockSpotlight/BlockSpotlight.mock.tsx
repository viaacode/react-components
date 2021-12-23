import { ButtonAction } from '../../types';

import { ImageInfo } from './BlockSpotlight';

const MOCK_BUTTON_ACTION: ButtonAction = {
	type: 'EXTERNAL_LINK',
	value: 'http://google.com',
};

export const MOCK_SPOTLIGHT_PROJECTS: ImageInfo[] = [
	{
		image: '/images/500x200.svg',
		title: 'Big item',
		buttonAction: MOCK_BUTTON_ACTION,
	},
	{
		image: '/images/500x200.svg',
		title: 'Small item',
		buttonAction: MOCK_BUTTON_ACTION,
	},
	{
		image: '/images/500x200.svg',
		title: 'Small item bis',
		buttonAction: undefined,
	},
];
