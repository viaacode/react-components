import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import PaginationProgress from './PaginationProgress';

export default {
	title: 'Components/PaginationProgress',
	component: PaginationProgress,
} as ComponentMeta<typeof PaginationProgress>;

const Template: ComponentStory<typeof PaginationProgress> = (args) => (
	<PaginationProgress {...args} />
);

export const Default = Template.bind({});
Default.args = {
	start: 1,
	end: 9,
	total: 20,
};
