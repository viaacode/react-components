import { storiesOf } from '@storybook/react';
import React from 'react';

import { AspectRatioWrapper } from './AspectRatioWrapper';

storiesOf('v1/components/AspectRatioWrapper', module)
	.addParameters({ jest: ['AspectRatioWrapper', 'AspectRatioWrapperIcon'] })
	.add('AspectRatioWrapper predefined', () => (
		<div style={{ width: '30%', backgroundColor: '#ddd', border: 'solid 2px black' }}>
			<AspectRatioWrapper aspect="16:9">16:9 (predefined)</AspectRatioWrapper>
		</div>
	))
	.add('AspectRatioWrapper numeric', () => (
		<div style={{ width: '30%', backgroundColor: '#ddd', border: 'solid 2px black' }}>
			<AspectRatioWrapper aspect={1.333333}>4:3 (numeric)</AspectRatioWrapper>
		</div>
	));
