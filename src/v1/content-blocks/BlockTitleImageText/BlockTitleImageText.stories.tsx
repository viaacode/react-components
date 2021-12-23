import { storiesOf } from '@storybook/react';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';

import { BlockTitleImageText } from './BlockTitleImageText';

const imageSource = '/images/500x200.svg';
const loremIpsumText = loremIpsum({ count: 10 });

storiesOf('v1/blocks/BlockTitleImageText', module)
	.addParameters({ jest: ['BlockTitleImageText'] })
	.add('BlockTitleImageText', () => (
		<BlockTitleImageText
			imageSource={imageSource}
			imageDescription="image showing the default dimensions on a grey background"
			title="Title"
			text={loremIpsumText}
		/>
	))
	.add('BlockTitleText', () => <BlockTitleImageText title="Title" text={loremIpsumText} />)
	.add('BlockTitleImage', () => (
		<BlockTitleImageText
			imageSource={imageSource}
			imageDescription="image showing the default dimensions on a grey background"
			title="Title"
		/>
	))
	.add('BlockImageText', () => (
		<BlockTitleImageText
			imageSource={imageSource}
			imageDescription="image showing the default dimensions on a grey background"
			text={loremIpsumText}
		/>
	));
