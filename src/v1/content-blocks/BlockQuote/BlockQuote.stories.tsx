import { storiesOf } from '@storybook/react';
import React from 'react';

import { BlockQuote } from './BlockQuote';

const quote =
	'There are only two ways to live your life. ' +
	'One is as though nothing is a miracle. ' +
	'The other is as though everything is a miracle.';
const authorImage = '/images/50x50.svg';
const authorName = 'Albert Einstein';
const authorInitials = 'AE';

storiesOf('v1/blocks/BlockQuote', module)
	.addParameters({ jest: ['BlockQuote'] })
	.add('BlockQuote', () => (
		<BlockQuote quote={quote} authorImage={authorImage} authorName={authorName} />
	))
	.add('BlockQuote no avatar', () => (
		<BlockQuote quote={quote} authorName={authorName} authorInitials={authorInitials} />
	))
	.add('BlockQuote verify no padding', () => (
		<div style={{ backgroundColor: 'grey' }}>
			<BlockQuote quote={quote} authorName={authorName} authorInitials={authorInitials} />
		</div>
	));
