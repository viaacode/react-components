import { storiesOf } from '@storybook/react';
import React, { ReactNode } from 'react';

import { action } from '../../helpers';
import { ButtonAction } from '../../types';

import { BlockImageGrid, GridItem } from './BlockImageGrid';

const elements: GridItem[] = [
	{ source: '/images/200x200.svg?id=0' },
	{ source: '/images/200x200.svg?id=1' },
	{ source: '/images/200x200.svg?id=2' },
	{ source: '/images/200x200.svg?id=3' },
	{ source: '/images/200x200.svg?id=4' },
	{ source: '/images/200x200.svg?id=5' },
	{ source: '/images/200x200.svg?id=6' },
	{ source: '/images/200x200.svg?id=7' },
	{ source: '/images/200x200.svg?id=8' },
	{ source: '/images/200x200.svg?id=9' },
];

const elements2: GridItem[] = [
	{
		source: '/images/500x200.svg?id=0',
		title: 'Vind inspiratie op jouw maat',
		text: 'Zoek materiaal op jouw onderwijsniveau, domein, vak en methode of laat je inspireren door een voorselectie.',
		action: { type: 'EXTERNAL_LINK', value: 'http://google.com' },
		buttonLabel: 'a button',
		buttonTitle: 'the button tooltip',
		buttonType: 'danger',
	},
	{
		source: '/images/500x200.svg?id=1',
		title: 'Bouw collecties, knip fragmenten',
		text: 'Knip zelf relevante fragmenten uit het beschikbare beeldmateriaal en bewaar ze in een eigen collectie.',
		action: { type: 'EXTERNAL_LINK', value: 'http://google.com' },
		buttonLabel: 'a button',
		buttonTitle: 'the button tooltip',
		buttonType: 'inline-link',
	},
	{
		source: '/images/500x200.svg?id=2',
		title: 'Doorzoek actueel en Vlaams materiaal',
		text: 'Vind beeld en geluid van Vlaamse televisieomroepen, musea, archieven en podiumkunstenorganisaties.',
		action: { type: 'EXTERNAL_LINK', value: 'http://google.com' },
	},
	{
		source: '/images/500x200.svg?id=3',
		title: 'Werk samen met leerlingen',
		text: 'Bundel fragmenten per thema, onderwerp of doel in je eigen lesklare collectie.',
		action: { type: 'EXTERNAL_LINK', value: 'http://google.com' },
	},
	{
		source: '/images/500x200.svg?id=4',
		title: 'Geselecteerd door leerkrachten',
		text: 'Laat je inspireren! Blader door tientallen domeinen boordevol relevant beeldmateriaal voor jouw vak.',
		action: { type: 'EXTERNAL_LINK', value: 'http://google.com' },
	},
	{
		source: '/images/500x200.svg?id=5',
		title: 'Links verdwijnen niet',
		text: 'Topfragment gespot? Bookmark je favoriete elements en vind ze met gemak terug in je persoonlijke werkruimte.',
		action: { type: 'EXTERNAL_LINK', value: 'http://google.com' },
	},
	{
		source: '/images/500x200.svg?id=6',
		title: 'test title',
		text: 'test text',
		action: { type: 'EXTERNAL_LINK', value: 'http://google.com' },
	},
	{
		source: '/images/500x200.svg?id=7',
		title: 'test title',
		text: 'test text',
		action: { type: 'EXTERNAL_LINK', value: 'http://google.com' },
	},
	{
		source: '/images/500x200.svg?id=8',
		title: 'test title',
		text: 'test text',
		action: { type: 'EXTERNAL_LINK', value: 'http://google.com' },
	},
	{
		source: '/images/500x200.svg?id=9',
		title: 'test title',
		text: 'test text',
	},
];

const elements3: GridItem[] = [
	{
		source: '/images/500x200.svg?id=0',
		textAbove: 'meemoo',
		action: { type: 'EXTERNAL_LINK', value: 'http://google.com' },
	},
	{
		source: '/images/500x200.svg?id=1',
		textAbove: 'vlaamse overheid',
		action: { type: 'EXTERNAL_LINK', value: 'http://google.com' },
	},
];

const renderLink = (buttonAction: ButtonAction | undefined | null, children: ReactNode) => {
	return (
		<div
			onClick={() => {
				if (buttonAction) {
					action('navigate')(buttonAction);
					window.location.href = buttonAction.value as string;
				}
			}}
		>
			{children}
		</div>
	);
};

storiesOf('v1/blocks/BlockImageGrid', module)
	.addParameters({ jest: ['Image'] })
	.add('BlockImageGrid 200x200', () => (
		<BlockImageGrid elements={elements} renderLink={renderLink} />
	))
	.add('BlockImageGrid 500x200', () => (
		<BlockImageGrid
			elements={elements2}
			imageWidth={500}
			imageHeight={200}
			itemWidth={500}
			renderLink={renderLink}
		/>
	))
	.add('BlockImageGrid wider item then image', () => (
		<BlockImageGrid
			elements={elements2}
			imageWidth={200}
			imageHeight={150}
			itemWidth={400}
			renderLink={renderLink}
		/>
	))
	.add('BlockImageGrid action', () => (
		<BlockImageGrid elements={elements2} renderLink={renderLink} />
	))
	.add('BlockImageGrid 150x150 fill contain', () => (
		<BlockImageGrid
			elements={elements2}
			imageWidth={150}
			imageHeight={150}
			fill="contain"
			renderLink={renderLink}
		/>
	))
	.add('BlockImageGrid 150x150 fill cover', () => (
		<BlockImageGrid
			elements={elements2}
			imageWidth={150}
			imageHeight={150}
			fill="cover"
			renderLink={renderLink}
		/>
	))
	.add('BlockImageGrid 150x150 fill auto', () => (
		<BlockImageGrid
			elements={elements2}
			imageWidth={150}
			imageHeight={150}
			fill="auto"
			renderLink={renderLink}
		/>
	))
	.add('BlockImageGrid align left', () => (
		<BlockImageGrid elements={elements2} align="left" renderLink={renderLink} />
	))
	.add('BlockImageGrid align right', () => (
		<BlockImageGrid elements={elements2} align="right" renderLink={renderLink} />
	))
	.add('BlockImageGrid align left align text right', () => (
		<BlockImageGrid
			elements={elements2}
			align="left"
			textAlign="right"
			renderLink={renderLink}
		/>
	))
	.add('BlockImageGrid align right align text left', () => (
		<BlockImageGrid
			elements={elements2}
			align="right"
			textAlign="left"
			renderLink={renderLink}
		/>
	))
	.add('BlockImageGrid text above logo', () => (
		<BlockImageGrid elements={elements3} renderLink={renderLink} itemWidth={300} />
	))
	.add('BlockImageGrid horizontal margin', () => (
		<BlockImageGrid
			elements={elements}
			renderLink={renderLink}
			horizontalMargin={50}
			verticalMargin={1}
		/>
	))
	.add('BlockImageGrid vertical margin', () => (
		<BlockImageGrid
			elements={elements}
			renderLink={renderLink}
			horizontalMargin={1}
			verticalMargin={50}
		/>
	))
	.add('BlockImageGrid text size and margin', () => (
		<BlockImageGrid
			elements={elements.map((elem) => ({
				...elem,
				title: 'This is a title',
				text: 'This is some text below it',
			}))}
			itemWidth={200}
			imageWidth={100}
			imageHeight={100}
			renderLink={renderLink}
			fill="contain"
			align="center"
			textSize={21}
			textMargin={16}
			textWeight={500}
			verticalMargin={50}
			horizontalMargin={50}
		/>
	));
