import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { cloneElement, ReactElement, useState } from 'react';

import TagsInput from './TagsInput';
import { TagInfo } from './TagsInput.types';
import { tagsInputOptionsMock } from './__mocks__/tags-input';

const TagsInputStoryComponent = ({ children }: { children: ReactElement }) => {
	const [value, setValue] = useState<TagInfo[]>([]);

	return cloneElement(children, {
		value,
		onChange: (changedValues: TagInfo[]) => {
			action('Changed values')(changedValues);
			setValue(changedValues);
		},
		onCreateOption: (tagToBeCreated: string) => {
			action('Created Tag')(tagToBeCreated);
			setValue([...value, { label: tagToBeCreated, value: tagToBeCreated }]);
		},
	});
};

export default {
	title: 'Components/TagsInput',
	component: TagsInput,
} as ComponentMeta<typeof TagsInput>;

const Template: ComponentStory<typeof TagsInput> = (args) => (
	<TagsInputStoryComponent>
		<TagsInput {...args} />
	</TagsInputStoryComponent>
);

export const Default = Template.bind({});
Default.args = {
	options: tagsInputOptionsMock,
};

export const AllowCreate = Template.bind({});
AllowCreate.args = {
	allowCreate: true,
	value: tagsInputOptionsMock,
};
