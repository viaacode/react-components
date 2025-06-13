import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Breadcrumbs from './Breadcrumbs';
import { MOCK_BREADCRUMBS } from './Breadcrumbs.mock';

export default {
	title: 'Components/Breadcrumbs',
	component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});
Default.args = {
	icon: <span>-</span>,
	items: MOCK_BREADCRUMBS,
};
