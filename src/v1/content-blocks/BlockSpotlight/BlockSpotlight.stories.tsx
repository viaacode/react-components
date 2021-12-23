import { storiesOf } from '@storybook/react';
import React from 'react';

import { action } from '../../helpers';
import { testRenderLink } from '../../helpers/render-link';

import { BlockSpotlight } from './BlockSpotlight';
import { MOCK_SPOTLIGHT_PROJECTS } from './BlockSpotlight.mock';

storiesOf('v1/blocks/BlockSpotlight', module)
	.addParameters({ jest: ['BlockSpotlight'] })
	.add('BlockSpotlight', () => (
		<BlockSpotlight
			elements={MOCK_SPOTLIGHT_PROJECTS}
			renderLink={testRenderLink(action('Clicked on spotlight item'))}
		/>
	));
