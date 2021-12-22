import { storiesOf } from '@storybook/react';
import React, { cloneElement, ReactElement, useState } from 'react';

import { action } from '../../helpers';

import { Checkbox } from './Checkbox';

const CheckboxStoryComponent = ({
	children,
	defaultChecked,
}: {
	children: ReactElement;
	defaultChecked?: boolean;
}) => {
	const [checked, setChecked] = useState(defaultChecked);

	return cloneElement(children, {
		checked,
		onChange: (checked: boolean) => {
			action('Checkbox toggled')(checked);
			setChecked(checked);
		},
	});
};

storiesOf('v1/components/Checkbox', module)
	.addParameters({ jest: ['Checkbox'] })
	.add('Checkbox', () => (
		<CheckboxStoryComponent>
			<Checkbox label="One" />
		</CheckboxStoryComponent>
	))
	.add('Checkbox default checked', () => (
		<CheckboxStoryComponent defaultChecked={true}>
			<Checkbox label="One" />
		</CheckboxStoryComponent>
	))
	.add('Checkbox default unchecked', () => (
		<CheckboxStoryComponent defaultChecked={false}>
			<Checkbox label="One" />
		</CheckboxStoryComponent>
	));
