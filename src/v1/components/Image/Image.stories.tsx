import { storiesOf } from '@storybook/react';
import React from 'react';

import { Image } from './Image';

storiesOf('v1/components/Image', module)
	.addParameters({ jest: ['Image'] })
	.add('Image', () => (
		<Image
			src="/images/400x300.svg"
			alt="image showing the default dimensions on a grey background"
		/>
	))
	.add('Image full width', () => (
		<Image
			wide
			src="/images/1600x900.svg"
			alt="image showing the default dimensions on a grey background"
		/>
	));
