import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import ContentInput from './ContentInput';

export default {
	title: 'Components/ContentInput',
	component: ContentInput,
} as ComponentMeta<typeof ContentInput>;

const Template: ComponentStory<typeof ContentInput> = (args) => <ContentInput {...args} />;

export const Default = Template.bind({});
