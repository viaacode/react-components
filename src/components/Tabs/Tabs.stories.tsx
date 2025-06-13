import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Tabs from './Tabs';
import { MOCK_TABS } from './__mocks__/tabs';

export default {
	title: 'Components/Tabs',
	component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {
	tabs: MOCK_TABS,
};
