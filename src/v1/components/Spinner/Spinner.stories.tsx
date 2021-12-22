import { storiesOf } from '@storybook/react';
import React from 'react';

import { COLORS } from '../../colors';

import { Spinner } from './Spinner';

storiesOf('v1/components/Spinner', module)
	.addParameters({ jest: ['Spinner'] })
	.add('Spinner', () => <Spinner />)
	.add('Large spinner', () => <Spinner size="large" />)
	.add('Light spinner', () => (
		<span style={{ padding: '20px', backgroundColor: COLORS.GRAYSCALE.G800 }}>
			<Spinner light />
		</span>
	));
