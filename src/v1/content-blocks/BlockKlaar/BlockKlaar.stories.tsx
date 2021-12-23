import { storiesOf } from '@storybook/react';
import React from 'react';

import { BlockKlaar } from './BlockKlaar';

storiesOf('v1/blocks/BlockKlaar', module)
	.addParameters({ jest: ['BlockKlaar'] })
	.add('BlockKlaar (1 titel)', () => (
		<BlockKlaar date="2016-07-13T18:46:01.933Z" titles={['Dit is een leuke titel']} />
	))
	.add('BlockKlaar (meerdere titels)', () => (
		<BlockKlaar
			date="2016-07-13T18:46:01.933Z"
			titles={['Dit is een leuke titel', 'Awesome']}
		/>
	))
	.add('BlockKlaar (geen datum)', () => (
		<BlockKlaar date="" titles={['Dit is een leuke titel', 'Awesome']} />
	));
