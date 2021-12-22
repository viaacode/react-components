import { storiesOf } from '@storybook/react';
import React, { cloneElement, ReactElement, useState } from 'react';

import { action } from '../../helpers';

import { KeyValueEditor } from './KeyValueEditor';
import { DATA_ARRAY_MOCK, DATA_OBJ_MOCK } from './KeyValueEditor.mock';

const KeyValueEditorStoryComponent = ({
	children,
	initialData,
}: {
	children: ReactElement;
	initialData: [string, string][];
}) => {
	const [data, setData] = useState(initialData);

	return cloneElement(children, {
		initialData,
		data,
		onChange: (newData: [string, string][]) => {
			action('Data changed')(newData);
			setData(newData);
		},
	});
};

storiesOf('v1/components/KeyValueEditor', module)
	.addParameters({ jest: ['KeyValueEditor'] })
	.add('KeyValueEditor dataArray', () => (
		<KeyValueEditorStoryComponent initialData={DATA_ARRAY_MOCK}>
			<KeyValueEditor data={[]} initialData={[]} onChange={action('dataChanged')} />
		</KeyValueEditorStoryComponent>
	))
	.add('KeyValueEditor dataObject', () => (
		<KeyValueEditorStoryComponent initialData={Object.entries(DATA_OBJ_MOCK)}>
			<KeyValueEditor data={[]} initialData={[]} onChange={action('dataChanged')} />
		</KeyValueEditorStoryComponent>
	))
	.add('KeyValueEditor readonly', () => (
		<KeyValueEditorStoryComponent initialData={DATA_ARRAY_MOCK}>
			<KeyValueEditor data={[]} initialData={[]} readonly />
		</KeyValueEditorStoryComponent>
	))
	.add('KeyValueEditor empty data', () => (
		<KeyValueEditorStoryComponent initialData={[]}>
			<KeyValueEditor data={[]} initialData={[]} />
		</KeyValueEditorStoryComponent>
	));
