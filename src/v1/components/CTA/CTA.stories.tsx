import { storiesOf } from '@storybook/react';
import React from 'react';

import { CTA } from './CTA';
import { CTA_MOCK } from './CTA.mock';

storiesOf('v1/components/CTA', module)
	.addParameters({ jest: ['CTA'] })
	.add('CTA', () => <CTA {...CTA_MOCK} />)
	.add('CTA wide', () => <CTA {...CTA_MOCK} width={'100%'} />)
	.add('CTA narrow', () => <CTA {...CTA_MOCK} width={'33%'} />)
	.add('CTA dark container', () => (
		<div className=" u-color-white" style={{ backgroundColor: '#2B414F', padding: '20px' }}>
			<CTA {...CTA_MOCK} />
		</div>
	));
