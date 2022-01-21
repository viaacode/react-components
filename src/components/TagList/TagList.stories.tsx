import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { loremIpsum } from 'lorem-ipsum';
import React, { cloneElement, ReactElement, useState } from 'react';

import TagList from './TagList';
import { tags } from './__mocks__/tag-list';

const TagListStoryComponent = ({ children }: { children: ReactElement }) => {
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	return cloneElement(children, {
		tags: tags.map((tag) => ({ ...tag, active: selectedTags.includes(tag.id as string) })),
		onTagClicked: (tagId: string) => {
			action('tag toggled')(tagId);
			const indexOf = selectedTags.indexOf(tagId);
			if (indexOf !== -1) {
				// already in the selected tags => remove the tag
				const newTabs = [...selectedTags];
				newTabs.splice(indexOf, 1);
				setSelectedTags(newTabs);
			} else {
				// add the tag
				setSelectedTags([...selectedTags, tagId]);
			}
		},
	});
};

export default {
	title: 'Components/TagList',
	component: TagList,
} as ComponentMeta<typeof TagList>;

const Template: ComponentStory<typeof TagList> = (args) => (
	<TagListStoryComponent>
		<TagList {...args} />
	</TagListStoryComponent>
);

export const Default = Template.bind({});
Default.args = {
	tags: tags,
	onTagClosed: undefined,
};

export const ClosableTags = Template.bind({});
ClosableTags.args = {
	tags: tags,
	onTagClosed: action('Tag closed'),
	onTagClicked: action('Tag clicked'),
};

export const MultilineTags = Template.bind({});
MultilineTags.args = {
	tags: [{ label: loremIpsum({ count: 1 }), id: 'test' }],
};

export const SelectableTags = Template.bind({});
SelectableTags.args = {
	tags: tags,
	onTagClicked: action('selected a tag'),
};
