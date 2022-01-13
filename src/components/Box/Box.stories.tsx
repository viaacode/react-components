import { ComponentMeta, ComponentStory } from '@storybook/react';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';

import Box from './Box';

const content = loremIpsum({ count: 10 });

export default {
	title: 'Components/Box',
	component: Box,
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = (args) => <Box {...args}>{content}</Box>;

export const Default = Template.bind({});
Default.args = {};
