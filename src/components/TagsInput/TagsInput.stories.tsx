import type { Meta, StoryObj } from '@storybook/react';
import React, { cloneElement, type ReactElement, useState } from 'react';
import { action } from 'storybook/actions';

import TagsInput from './TagsInput';
import type { TagInfo } from './TagsInput.types';
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

const meta: Meta<typeof TagsInput> = {
	title: 'Components/TagsInput',
	component: TagsInput,
};
export default meta;
type Story = StoryObj<typeof TagsInput>;

const Template = (args: any) => (
	<TagsInputStoryComponent>
		<TagsInput {...args} />
	</TagsInputStoryComponent>
);

export const Default: Story = {
	args: {
		options: tagsInputOptionsMock,
	},
	render: Template,
};

export const AllowCreate: Story = {
	args: {
		allowCreate: true,
		value: tagsInputOptionsMock,
	},
	render: Template,
};
