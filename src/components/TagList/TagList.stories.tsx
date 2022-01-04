import { storiesOf } from '@storybook/react';
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

storiesOf('v1/components/TagList', module)
	.addParameters({ jest: ['TagList'] })
	.add('TagList', () => <TagList tags={tags} />)
	.add('TagList with closable tags', () => (
		<TagList
			tags={tags}
			closable
			swatches={false}
			onTagClosed={action('Tag closed')}
			onTagClicked={action('Tag clicked')}
		/>
	))
	.add('TagList with multiline tags', () => (
		<div style={{ width: '300px' }}>
			<TagList
				tags={[{ label: loremIpsum({ count: 1 }), id: 'test' }]}
				closable
				swatches={false}
			/>
		</div>
	))
	.add('TagList with selectable tags', () => (
		<TagListStoryComponent>
			<TagList
				tags={tags}
				closable={false}
				swatches={false}
				selectable={true}
				onTagClicked={action('selected a tag')}
			/>
		</TagListStoryComponent>
	))
	.add('TagList with custom color swatches', () => <TagList tags={colorTags} swatches />)
	.add('TagList without swatches', () => <TagList tags={tags} swatches={false} />)
	.add('TagList with borderless tags', () => <TagList tags={tags} bordered={false} />)
	.add('Minimalist TagList', () => <TagList tags={tags} swatches={false} bordered={false} />);
