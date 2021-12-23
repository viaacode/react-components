import { storiesOf } from '@storybook/react';
import React from 'react';

import { action } from '../../helpers';
import { testRenderLink } from '../../helpers/render-link';

import { BlockCTAs } from './BlockCTAs';
import { CTAS_MOCK } from './BlockCTAs.mock';

const renderLink = testRenderLink(action('navigate to'));
storiesOf('v1/blocks/BlockCTAs', module)
	.addParameters({ jest: ['BlockCTAs'] })
	.add('BlockCTAs', () => <BlockCTAs elements={CTAS_MOCK} renderLink={renderLink} />)
	.add('BlockCTA single', () => <BlockCTAs elements={[CTAS_MOCK[0]]} renderLink={renderLink} />)
	.add('BlockCTA narrow', () => (
		<BlockCTAs elements={CTAS_MOCK} width="30%" renderLink={renderLink} />
	));
