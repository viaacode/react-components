import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { FlexItem } from './FlexItem';

export default {
	title: 'Components/FlexItem',
	component: FlexItem,
} as ComponentMeta<typeof FlexItem>;

const Template: ComponentStory<typeof FlexItem> = (args) => (
	<FlexItem {...args}>Flex Item</FlexItem>
);

export const Basic = Template.bind({});
Basic.args = {};

export const Shrink = Template.bind({});
Shrink.args = {
	shrink: true,
};
