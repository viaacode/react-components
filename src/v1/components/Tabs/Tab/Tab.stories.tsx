import { storiesOf } from '@storybook/react';
import React from 'react';

import { IconNameSchema } from '../../Icon/Icon.types';

import { Tab } from './Tab';

const mockTab = {
	id: 'videosTestId',
	label: 'Videos',
	href: '#',
	active: true,
};

const mockTabWithIcon = {
	...mockTab,
	icon: 'video' as IconNameSchema,
};

storiesOf('v1/components/Tab', module)
	.addParameters({ jest: ['Tab'] })
	.add('Tab', () => <Tab {...mockTab} />)
	.add('Tab with Icon', () => <Tab {...mockTabWithIcon} />);
