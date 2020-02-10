import React from 'react';

import { storiesOf } from '@storybook/react';

import { CTA } from './CTA';
import { CTA_MOCK } from './CTA.mock';

storiesOf('components/CTA', module)
	.addParameters({ jest: ['CTA'] })
	.add('CTA', () => <CTA {...CTA_MOCK} />)
	.add('CTA dark container', () => (
		<div className=" u-color-white" style={{ backgroundColor: '#2B414F', padding: '20px' }}>
			<CTA {...CTA_MOCK} />
		</div>
	));
