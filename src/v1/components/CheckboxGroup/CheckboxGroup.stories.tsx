import { storiesOf } from '@storybook/react';
import React from 'react';

import { Checkbox } from '../Checkbox/Checkbox';

import { CheckboxGroup } from './CheckboxGroup';

storiesOf('v1/components/CheckboxGroup', module)
	.addParameters({ jest: ['CheckboxGroup'] })
	.add('CheckboxGroup', () => (
		<CheckboxGroup>
			<Checkbox label="Aluminium" />
			<Checkbox label="Cadmium" />
			<Checkbox label="Dubnium" />
		</CheckboxGroup>
	))
	.add('CheckboxGroup inline', () => (
		<CheckboxGroup inline={true}>
			<Checkbox label="Aluminium" />
			<Checkbox label="Cadmium" />
			<Checkbox label="Dubnium" />
		</CheckboxGroup>
	));
