import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Tab from './Tab';

export default {
	title: 'Components/Tab',
	component: Tab,
} as ComponentMeta<typeof Tab>;

const Template: ComponentStory<typeof Tab> = (args) => <Tab {...args} />;

export const Default = Template.bind({});
Default.args = {
	id: 'tab-id',
	label: 'Tab me!',
	active: false,
};
