import { storiesOf } from '@storybook/react';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';

import { BlockImageTitleTextButton } from './BlockImageTitleTextButton';

const imageSource = '/images/1280x720.svg';
const loremIpsumText = loremIpsum({ count: 10 });

export const blockImageTitleTextButtonExample = (
	<BlockImageTitleTextButton
		imageSource={imageSource}
		imageDescription="image showing the default dimensions on a grey background"
		title="Title"
		text={loremIpsumText}
		buttonLabel="Goto video"
	/>
);

storiesOf('v1/blocks/BlockImageTitleTextButton', module)
	.addParameters({ jest: ['BlockImageTitleTextButton'] })
	.add('BlockImageTitleTextButton', () => blockImageTitleTextButtonExample);
