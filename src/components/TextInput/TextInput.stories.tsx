import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { TextInput } from './TextInput';

export default {
	title: 'Components/TextInput',
	component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

const TabOrderTemplate: ComponentStory<typeof TextInput> = (args) => (
	<>
		<TextInput {...args} />
		<TextInput {...args} />
	</>
);

export const Default = Template.bind({});
Default.args = {};

export const TabOrder = TabOrderTemplate.bind({});
TabOrder.args = {};
