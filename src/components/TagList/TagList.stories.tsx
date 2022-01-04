import { ComponentMeta, ComponentStory } from '@storybook/react';
import { loremIpsum } from 'lorem-ipsum';
import React, { cloneElement, ReactElement, useState } from 'react';

import { action } from '../../helpers';

import TagList from './TagList';
import { colorTags, tags } from './__mocks__';

const TagListStoryComponent = ({
	children,
}: {
	children: ReactElement;
	initialPageIndex?: number;
}) => {
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
};

export const ClosableTags = Template.bind({});
ClosableTags.args = {
	tags: tags,
	closable: true,
	swatches: false,
	onTagClosed: action('Tag closed'),
	onTagClicked: action('Tag clicked'),
};

export const MultilineTags = Template.bind({});
MultilineTags.args = {
	tags: [{ label: loremIpsum({ count: 1 }), id: 'test' }],
	closable: true,
	swatches: false,
};

export const SelectableTags = Template.bind({});
SelectableTags.args = {
	tags: tags,
	closable: false,
	swatches: false,
	selectable: true,
	onTagClicked: action('selected a tag'),
};

export const CustomColorSwatches = Template.bind({});
CustomColorSwatches.args = {
	tags: colorTags,
	swatches: true,
};

export const WithoutSwatches = Template.bind({});
WithoutSwatches.args = {
	tags: tags,
	swatches: false,
};

export const Borderless = Template.bind({});
Borderless.args = {
	tags: tags,
	bordered: false,
};

export const Minimalist = Template.bind({});
Minimalist.args = {
	tags: tags,
	swatches: false,
	bordered: false,
};
