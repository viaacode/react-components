import { storiesOf } from '@storybook/react';
import React from 'react';

import { BlockIFrame } from './BlockIFrame';

storiesOf('v1/blocks/BlockIFrame', module)
	.addParameters({ jest: ['BlockIFrame'] })
	.add('BlockIFrame', () => (
		<BlockIFrame
			title="Video about VIAA"
			src="http://player.vimeo.com/video/55073825"
			width={755}
			height={321}
		/>
	))
	.add('BlockIFrame without http prefix', () => (
		<BlockIFrame
			title="Video about VIAA"
			src="player.vimeo.com/video/55073825"
			width={755}
			height={321}
		/>
	))
	.add('BlockIFrame with // prefix', () => (
		<BlockIFrame
			title="Video about VIAA"
			src="//player.vimeo.com/video/55073825"
			width={755}
			height={321}
		/>
	));
