import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';

import { action } from '../../helpers/action';

import { Select } from './Select';

const options = [
	{ label: 'Aluminium', value: 'Al' },
	{ label: 'Cadmium', value: 'Cd' },
	{ label: 'Dubnium', value: 'Db' },
	{ label: 'Potassium', value: 'K' },
	{ label: 'Vanadium', value: 'V' },
	{ label: 'Palladium', value: 'Pd' },
	{ label: 'Polonium', value: 'Po' },
	{ label: 'Rhodium', value: 'Rh' },
	{ label: 'Yttrium', value: 'Y' },
	{ label: 'Uranium', value: 'U' },
];

storiesOf('Select', module)
	.addParameters({ jest: ['Select'] })
	.add('Select', () => (
		<Fragment>
			<Select options={options} onChange={action('onChange')} />
		</Fragment>
	));