import { storiesOf } from '@storybook/react';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';

import { BlockIntro } from './BlockIntro';

storiesOf('v1/blocks/BlockIntro', module)
	.addParameters({ jest: ['BlockIntro'] })
	.add('BlockIntro', () => <BlockIntro title="Page title" content={loremIpsum({ count: 3 })} />)
	.add('BlockIntro (right)', () => (
		<BlockIntro title="Page title" content={loremIpsum({ count: 3 })} align="right" />
	))
	.add('BlockIntro with heading type', () => (
		<BlockIntro
			headingType="h3"
			title="Page title"
			content={loremIpsum({ count: 3 })}
			align="right"
		/>
	))
	.add('BlockIntro verify no padding top/bottom', () => (
		<div style={{ backgroundColor: 'gray' }}>
			<BlockIntro
				headingType="h3"
				title="Page title"
				content={loremIpsum({ count: 3 })}
				align="right"
			/>
		</div>
	));
