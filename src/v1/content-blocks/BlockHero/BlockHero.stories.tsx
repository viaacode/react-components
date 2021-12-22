import { storiesOf } from '@storybook/react';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';

import { ButtonProps } from '../../components';
import { action } from '../../helpers';
import { testRenderLink } from '../../helpers/render-link';
import { ButtonAction } from '../../types';

import { BlockHero } from './BlockHero';

const mockVideo =
	'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
const mockPoster =
	'https://assets-qas.hetarchief.be/avo2/CONTENT_PAGE_IMAGE/Indianenkamp-6b09d280-8cb0-11ea-98b4-7592673e8244.jpg';
const mockButtons: (ButtonProps & { buttonAction: ButtonAction })[] = [
	{
		label: 'Inloggen',
		type: 'primary',
		buttonAction: {
			type: 'INTERNAL_LINK',
			value: '/login',
		},
	},
	{
		label: 'Account aanmaken',
		type: 'secondary-i',
		buttonAction: {
			type: 'INTERNAL_LINK',
			value: '/register',
		},
	},
];

const renderLink = testRenderLink(action('navigate to'));

storiesOf('v1/blocks/BlockHero', module)
	.addParameters({ jest: ['BlockHero'] })
	.add('BlockHero video with poster', () => (
		<div className="u-position-relative" style={{ backgroundColor: '#2b414f' }}>
			<BlockHero
				title="Page title"
				content={loremIpsum({ count: 3 })}
				contentColor="#d6dee3"
				src={mockVideo}
				poster={mockPoster}
				buttons={mockButtons}
				textBelowButtons={
					'<p>Lesgever en nog geen account?<br/><a href="/stamboek">Maak gratis een account aan.</a></p>'
				}
				renderLink={renderLink}
			/>
		</div>
	))
	.add('BlockHero video without poster', () => (
		<div className="u-position-relative" style={{ backgroundColor: '#2b414f' }}>
			<BlockHero
				title="Page title"
				content={loremIpsum({ count: 3 })}
				src={mockVideo}
				buttons={mockButtons}
				renderLink={renderLink}
			/>
		</div>
	))
	.add('BlockHero img', () => (
		<div className="u-position-relative" style={{ backgroundColor: '#2b414f' }}>
			<BlockHero
				title="Page title"
				content={loremIpsum({ count: 3 })}
				poster={mockPoster}
				buttons={mockButtons}
				renderLink={renderLink}
			/>
		</div>
	))
	.add('BlockHero bg color', () => (
		<div className="u-position-relative" style={{ backgroundColor: 'red' }}>
			<BlockHero
				title="Page title"
				content={loremIpsum({ count: 3 })}
				poster={mockPoster}
				buttons={mockButtons}
				renderLink={renderLink}
			/>
		</div>
	))
	.add('BlockHero text color', () => (
		<div className="u-position-relative" style={{ backgroundColor: '#2b414f' }}>
			<BlockHero
				title="Page title"
				titleColor="red"
				content={loremIpsum({ count: 3 })}
				contentColor="red"
				poster={mockPoster}
				buttons={mockButtons}
				renderLink={renderLink}
			/>
		</div>
	));
