import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import TextArea from './TextArea';

export default {
	title: 'Components/TextArea',
	component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {};
