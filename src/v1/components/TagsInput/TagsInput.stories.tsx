import { storiesOf } from '@storybook/react';
import React, { cloneElement, Fragment, ReactElement, useState } from 'react';

import { action } from '../../helpers';

import { TagInfoSchema, TagsInput } from './TagsInput';

const TagsInputStoryComponent = ({
	children,
	defaultValue = [] as TagInfoSchema[],
}: {
	children: ReactElement;
	defaultValue?: TagInfoSchema[];
}) => {
	const [value, setValue] = useState(defaultValue);

	return cloneElement(children, {
		value,
		onChange: (changedValues: TagInfoSchema[]) => {
			action('tags input changed')(changedValues);
			setValue(changedValues);
		},
		onCreate: (tagToBeCreated: TagInfoSchema) => {
			action('creating tag')(tagToBeCreated);
			setValue([...value, tagToBeCreated]);
		},
	});
};

const tags = [
	{ label: 'Aluminium', value: 'aluminium' },
	{ label: 'Cadmium', value: 'cadmium' },
	{ label: 'Dubnium', value: 'dubnium' },
	{ label: 'Potassium', value: 'potassium' },
	{ label: 'Vanadium', value: 'vanadium' },
	{ label: 'Palladium', value: 'palladium' },
	{ label: 'Polonium', value: 'polonium' },
	{ label: 'Rhodium', value: 'rhodium' },
	{ label: 'Yttrium', value: 'yttrium' },
	{ label: 'Uranium', value: 'uranium' },
];

storiesOf('v1/components/TagsInput', module)
	.addParameters({ jest: ['TagsInput'] })
	.add('TagsInput', () => (
		<Fragment>
			<TagsInputStoryComponent>
				<TagsInput
					options={tags}
					placeholder="Select elements"
					className="test"
					id="elements"
				/>
			</TagsInputStoryComponent>
		</Fragment>
	))
	.add('TagsInput allow create', () => (
		<Fragment>
			<TagsInputStoryComponent>
				<TagsInput options={tags} allowCreate />
			</TagsInputStoryComponent>
		</Fragment>
	))
	.add('TagsInput disabled', () => (
		<Fragment>
			<TagsInputStoryComponent>
				<TagsInput options={tags} disabled />
			</TagsInputStoryComponent>
		</Fragment>
	))
	.add('TagsInput single value', () => (
		<Fragment>
			<TagsInputStoryComponent>
				<TagsInput options={tags} allowMulti={false} />
			</TagsInputStoryComponent>
		</Fragment>
	))
	.add('TagsInput isLoading', () => (
		<Fragment>
			<TagsInputStoryComponent>
				<TagsInput options={[]} isLoading={true} />
			</TagsInputStoryComponent>
		</Fragment>
	));
