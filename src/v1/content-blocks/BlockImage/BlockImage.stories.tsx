import { storiesOf } from '@storybook/react';
import React from 'react';

import { BlockImage } from './BlockImage';

const imageSource = '/images/500x200.svg';

storiesOf('v1/blocks/BlockImage', module)
	.addParameters({ jest: ['BlockImage'] })
	.add('BlockImage', () => (
		<BlockImage
			imageSource={imageSource}
			imageDescription="image showing the default dimensions on a grey background"
		/>
	))
	.add('BlockImage full-width', () => (
		<BlockImage imageSource={imageSource} width={'full-width'} />
	))
	.add('BlockImage full-width with annotation', () => (
		<BlockImage
			imageSource={imageSource}
			width={'full-width'}
			title="Dit is een bijschrift"
			text="Dit is een subscript"
		/>
	))
	.add('BlockImage page header', () => (
		<BlockImage imageSource={imageSource} width={'page-header'} />
	))
	.add('BlockImage page header with annotation', () => (
		<BlockImage
			imageSource={imageSource}
			width={'page-header'}
			title="Dit is een bijschrift"
			text="Dit is een subscript "
		/>
	))
	.add('BlockImage 500px', () => (
		<BlockImage
			imageSource={imageSource}
			imageDescription="image showing the default dimensions on a grey background"
			width="500px"
		/>
	))
	.add('BlockImage 400px', () => (
		<BlockImage
			imageSource={imageSource}
			imageDescription="image showing the default dimensions on a grey background"
			width="400px"
		/>
	))
	.add('BlockImage align', () => (
		<>
			<BlockImage
				imageSource={imageSource}
				imageDescription="image showing the default dimensions on a grey background"
				width="400px"
				align="left"
			/>
			<BlockImage
				imageSource={imageSource}
				imageDescription="image showing the default dimensions on a grey background"
				width="400px"
				align="center"
			/>{' '}
			<BlockImage
				imageSource={imageSource}
				imageDescription="image showing the default dimensions on a grey background"
				width="400px"
				align="right"
			/>
		</>
	))
	.add('BlockImage title and text', () => (
		<BlockImage
			imageSource={imageSource}
			imageDescription="image showing the default dimensions on a grey background"
			title="A big image showing its dimensions on a grey background"
			text="The author of the image"
			width="500px"
		/>
	))
	.add('BlockImage dark container', () => (
		<div className=" u-color-white" style={{ backgroundColor: '#2B414F', padding: '20px' }}>
			<BlockImage
				imageSource={imageSource}
				imageDescription="image showing the default dimensions on a grey background"
				title="A big image showing its dimensions on a grey background"
				text="The author of the image"
				width="500px"
			/>
		</div>
	));
