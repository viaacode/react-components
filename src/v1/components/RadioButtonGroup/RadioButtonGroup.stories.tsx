import { storiesOf } from '@storybook/react';
import React, { Fragment, ReactElement, useState } from 'react';

import { action } from '../../helpers';

import { RadioButtonGroup } from './RadioButtonGroup';
import { RADIO_BUTTON_OPTIONS } from './RadioButtonGroup.mock';

const RadioButtonGroupStoryComponent = ({
	children,
	defaultValue,
}: {
	children: ReactElement;
	defaultValue?: string;
}) => {
	const [value, setValue] = useState(defaultValue);

	return (
		<Fragment>
			{React.cloneElement(children, {
				value,
				onChange: (value: string) => {
					action('RadioButtonGroup value changed')(value);
					setValue(value);
				},
			})}
		</Fragment>
	);
};

storiesOf('v1/components/RadioButtonGroup', module)
	.addParameters({ jest: ['RadioButtonGroup'] })
	.add('RadioButtonGroup', () => (
		<RadioButtonGroupStoryComponent>
			<RadioButtonGroup options={RADIO_BUTTON_OPTIONS} value={''} onChange={() => null} />
		</RadioButtonGroupStoryComponent>
	))
	.add('RadioButtonGroup default option', () => (
		<RadioButtonGroupStoryComponent defaultValue="steak">
			<RadioButtonGroup options={RADIO_BUTTON_OPTIONS} value={''} onChange={() => null} />
		</RadioButtonGroupStoryComponent>
	))
	.add('RadioButtonGroup inline', () => (
		<RadioButtonGroupStoryComponent>
			<RadioButtonGroup
				options={RADIO_BUTTON_OPTIONS}
				value={''}
				onChange={() => null}
				inline
			/>
		</RadioButtonGroupStoryComponent>
	));
