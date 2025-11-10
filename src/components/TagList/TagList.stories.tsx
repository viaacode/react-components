import type { Meta, StoryObj } from '@storybook/react';
import { loremIpsum } from 'lorem-ipsum';
import { cloneElement, type ReactElement, useState } from 'react';
import { action } from 'storybook/actions';
import { tags } from './__mocks__/tag-list.js';
import TagList from './TagList.js';

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

const meta: Meta<typeof TagList> = {
	title: 'Components/TagList',
	component: TagList,
};
export default meta;
type Story = StoryObj<typeof TagList>;

const Template = (args: any) => (
	<TagListStoryComponent>
		<TagList {...args} />
	</TagListStoryComponent>
);

export const Default: Story = {
	args: {
		tags: tags,
		onTagClosed: undefined,
	},
	render: Template,
};

export const ClosableTags: Story = {
	args: {
		tags: tags,
		onTagClosed: action('Tag closed'),
		onTagClicked: action('Tag clicked'),
	},
	render: Template,
};

export const MultilineTags: Story = {
	args: {
		tags: [{ label: loremIpsum({ count: 1 }), id: 'test' }],
	},
	render: Template,
};

export const SelectableTags: Story = {
	args: {
		tags: tags,
		onTagClicked: action('selected a tag'),
	},
	render: Template,
};
