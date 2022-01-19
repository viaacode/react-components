import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Datepicker from './Datepicker';

export default {
	title: 'Components/Badge',
	component: Datepicker,
} as ComponentMeta<typeof Datepicker>;

const Template: ComponentStory<typeof Datepicker> = (args) => <Datepicker {...args} />;

export const Default = Template.bind({});
