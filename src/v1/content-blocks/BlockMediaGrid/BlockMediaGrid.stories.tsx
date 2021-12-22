import { storiesOf } from '@storybook/react';
import { get } from 'lodash-es';
import React from 'react';

import { FlowPlayer } from '../../components';
import { action } from '../../helpers';
import { testRenderLink } from '../../helpers/render-link';
import { BlockHeading } from '../BlockHeading/BlockHeading';

import { BlockMediaGrid } from './BlockMediaGrid';
import {
	MEDIA_LIST_COLORED_CTA_MOCK,
	MEDIA_LIST_CTA_MOCK,
	MEDIA_LIST_CTA_MOCK_WITHOUT_BUTTONS,
	MEDIA_LIST_IMAGE_CTA_MOCK,
	MEDIA_LIST_ITEMS_MOCK,
	MEDIA_LIST_MOCK,
	MEDIA_LIST_TITLE_BUTTON_MOCK,
	MEDIA_LIST_TITLE_MOCK,
} from './BlockMediaGrid.mock';

storiesOf('v1/blocks/BlockMediaGrid', module)
	.addParameters({ jest: ['BlockMediaGrid'] })
	.add('BlockMediaGrid', () => <BlockMediaGrid {...MEDIA_LIST_MOCK} />)
	.add('BlockMediaGrid with title', () => <BlockMediaGrid {...MEDIA_LIST_TITLE_MOCK} />)
	.add('BlockMediaGrid with title and button', () => (
		<BlockMediaGrid {...MEDIA_LIST_TITLE_BUTTON_MOCK} />
	))
	.add('BlockMediaGrid with modal player', () => (
		<BlockMediaGrid
			elements={MEDIA_LIST_ITEMS_MOCK}
			openMediaInModal
			renderPlayerModalBody={(item) => (
				<FlowPlayer src={item.src as string} poster={get(item, 'thumbnail.src')} />
			)}
			renderLink={testRenderLink(action('BlockMediaGrid with modal player'))}
		/>
	))
	.add('BlockMediaGrid with CTA', () => <BlockMediaGrid {...MEDIA_LIST_CTA_MOCK} />)
	.add('BlockMediaGrid with CTA without buttons', () => (
		<BlockMediaGrid {...MEDIA_LIST_CTA_MOCK_WITHOUT_BUTTONS} />
	))
	.add('BlockMediaGrid with colored CTA', () => (
		<BlockMediaGrid {...MEDIA_LIST_COLORED_CTA_MOCK} />
	))
	.add('BlockMediaGrid with image CTA', () => <BlockMediaGrid {...MEDIA_LIST_IMAGE_CTA_MOCK} />)
	.add('BlockMediaGrid with CTA full width', () => (
		<BlockMediaGrid {...MEDIA_LIST_CTA_MOCK} fullWidth />
	))
	.add('BlockMediaGrid few items', () => (
		<>
			<BlockHeading type="h1">one item:</BlockHeading>
			<BlockMediaGrid
				{...MEDIA_LIST_MOCK}
				elements={MEDIA_LIST_MOCK.elements.slice(0, 1)}
				title={undefined}
			/>
			<BlockHeading type="h1">two item:</BlockHeading>
			<BlockMediaGrid
				{...MEDIA_LIST_MOCK}
				elements={MEDIA_LIST_MOCK.elements.slice(0, 2)}
				title={undefined}
			/>
			<BlockHeading type="h1">three item:</BlockHeading>
			<BlockMediaGrid
				{...MEDIA_LIST_MOCK}
				elements={MEDIA_LIST_MOCK.elements.slice(0, 3)}
				title={undefined}
			/>
			<BlockHeading type="h1">four item:</BlockHeading>
			<BlockMediaGrid
				{...MEDIA_LIST_MOCK}
				elements={MEDIA_LIST_MOCK.elements.slice(0, 4)}
				title={undefined}
			/>
			<BlockHeading type="h1">five item:</BlockHeading>
			<BlockMediaGrid
				{...MEDIA_LIST_MOCK}
				elements={MEDIA_LIST_MOCK.elements.slice(0, 5)}
				title={undefined}
			/>
		</>
	));
