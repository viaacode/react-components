import { storiesOf } from '@storybook/react';
import React, { cloneElement, ReactElement, useState } from 'react';

import { action } from '../../helpers';

import { ImageGrid } from './ImageGrid';

const images = [
	'/images/200x200.svg?id=0',
	'/images/200x200.svg?id=1',
	'/images/200x200.svg?id=2',
	'/images/200x200.svg?id=3',
	'/images/200x200.svg?id=4',
	'/images/200x200.svg?id=5',
	'/images/200x200.svg?id=6',
	'/images/200x200.svg?id=7',
	'/images/200x200.svg?id=8',
	'/images/200x200.svg?id=9',
];

const images2 = [
	'/images/500x200.svg?id=0',
	'/images/500x200.svg?id=1',
	'/images/500x200.svg?id=2',
	'/images/500x200.svg?id=3',
	'/images/500x200.svg?id=4',
	'/images/500x200.svg?id=5',
	'/images/500x200.svg?id=6',
	'/images/500x200.svg?id=7',
	'/images/500x200.svg?id=8',
	'/images/500x200.svg?id=9',
];

const ImageGroupStoryComponent = ({
	children,
	defaultValue = [],
}: {
	children: ReactElement;
	defaultValue?: string[];
}) => {
	const [value, setValue] = useState(defaultValue);

	return cloneElement(children, {
		value,
		onChange: (value: string[]) => {
			action('Image selection changed')(value);
			setValue(value);
		},
	});
};

storiesOf('v1/components/ImageGrid', module)
	.addParameters({ jest: ['Image'] })
	.add('ImageGrid 200x200', () => <ImageGrid images={images} />)
	.add('ImageGrid 500x200', () => <ImageGrid images={images2} width={500} height={200} />)
	.add('ImageGrid 200x200 fill contain', () => (
		<ImageGrid images={images2} width={200} height={200} fill="contain" />
	))
	.add('ImageGrid 200x200 fill cover', () => (
		<ImageGrid images={images2} width={200} height={200} fill="cover" />
	))
	.add('ImageGrid selectable single', () => (
		<ImageGroupStoryComponent>
			<ImageGrid images={images} allowSelect={true} />
		</ImageGroupStoryComponent>
	))
	.add('ImageGrid selectable multi', () => (
		<ImageGroupStoryComponent>
			<ImageGrid images={images} allowSelect={true} allowMulti={true} />
		</ImageGroupStoryComponent>
	))
	.add('ImageGrid selectable multi default value', () => (
		<ImageGroupStoryComponent defaultValue={images.slice(0, 3)}>
			<ImageGrid images={images} allowSelect={true} allowMulti={true} />
		</ImageGroupStoryComponent>
	));
