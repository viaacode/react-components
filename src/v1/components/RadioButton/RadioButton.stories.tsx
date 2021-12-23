import { storiesOf } from '@storybook/react';
import React, { cloneElement, ReactElement, useState } from 'react';

import { action } from '../../helpers';

import { RadioButton } from './RadioButton';

const RadioButtonStoryComponent = ({
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
			action('RadioButton toggled')(checked);
			setChecked(checked);
		},
	});
};

storiesOf('v1/components/RadioButton', module)
	.addParameters({ jest: ['RadioButton'] })
	.add('Radio Button', () => (
		<RadioButtonStoryComponent>
			<RadioButton
				name="List1"
				label="One"
				value="One"
				onChange={action('Radio button selected')}
			/>
		</RadioButtonStoryComponent>
	))
	.add('Radio Button default checked', () => (
		<RadioButtonStoryComponent defaultChecked={true}>
			<RadioButton
				name="List2"
				label="One"
				value="One"
				onChange={action('Radio button selected')}
			/>
		</RadioButtonStoryComponent>
	));
