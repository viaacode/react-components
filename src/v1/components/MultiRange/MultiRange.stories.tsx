import { storiesOf } from '@storybook/react';
import React, { cloneElement, ReactElement, useState } from 'react';

import { action } from '../../helpers';

import { MultiRange } from './MultiRange';

const MultiRangeStoryComponent = ({
	children,
	defaultValues = [0, 100],
}: {
	children: ReactElement;
	defaultValues?: number[];
}) => {
	const [values, setValues] = useState(defaultValues);

	return cloneElement(children, {
		values,
		onChange: (values: number[]) => {
			action('Input changed')(values);
			setValues(values);
		},
	});
};

storiesOf('v1/components/MultiRange', module)
	.addParameters({ jest: ['MultiRange'] })
	.add('MultiRange', () => (
		<MultiRangeStoryComponent>
			<MultiRange />
		</MultiRangeStoryComponent>
	))
	.add('MultiRange disabled', () => (
		<MultiRangeStoryComponent>
			<MultiRange disabled />
		</MultiRangeStoryComponent>
	))
	.add('MultiRange allow overlap', () => (
		<MultiRangeStoryComponent>
			<MultiRange allowOverlap={true} onChange={action('Value changed')} />
		</MultiRangeStoryComponent>
	))
	.add('MultiRange with default values', () => (
		<MultiRangeStoryComponent defaultValues={[20, 60]}>
			<MultiRange />
		</MultiRangeStoryComponent>
	))
	.add('MultiRange with single value', () => (
		<MultiRangeStoryComponent defaultValues={[20]}>
			<MultiRange />
		</MultiRangeStoryComponent>
	))
	.add('MultiRange with number field', () => (
		<MultiRangeStoryComponent defaultValues={[20]}>
			<MultiRange showNumber />
		</MultiRangeStoryComponent>
	));
