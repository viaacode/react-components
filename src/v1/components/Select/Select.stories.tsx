import { storiesOf } from '@storybook/react';
import React, { cloneElement, ReactElement, useState } from 'react';

import { action } from '../../helpers';

import { Select } from './Select';
import { SELECT_MOCK_OPTIONS } from './Select.mock';

const SelectStoryComponent = ({ children }: { children: ReactElement }) => {
	const [value, setValue] = useState<string | null>('Al');

	return cloneElement(children, {
		value,
		onChange: (value: string | null) => {
			setValue(value);
			action('selection changed: ')(value);
		},
	});
};

storiesOf('v1/components/Select', module)
	.addParameters({ jest: ['Select'] })
	.add('Select', () => (
		<Select options={SELECT_MOCK_OPTIONS} value="Db" onChange={action('onChange')} />
	))
	.add('Select disabled', () => (
		<Select options={SELECT_MOCK_OPTIONS} value="Db" onChange={action('onChange')} disabled />
	))
	.add('Select clearable', () => (
		<SelectStoryComponent>
			<Select
				options={SELECT_MOCK_OPTIONS}
				value="Db"
				onChange={action('onChange')}
				clearable
			/>
		</SelectStoryComponent>
	))
	.add('Select loading', () => (
		<Select options={SELECT_MOCK_OPTIONS} value="Db" onChange={action('onChange')} loading />
	))
	.add('Select reset after select option', () => (
		<SelectStoryComponent>
			<Select
				options={SELECT_MOCK_OPTIONS}
				placeholder="select a value"
				onChange={action('onChange')}
				value={null}
			/>
		</SelectStoryComponent>
	));
