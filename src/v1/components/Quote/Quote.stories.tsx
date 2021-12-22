import { storiesOf } from '@storybook/react';
import React from 'react';

import { Quote } from './Quote';
import { MOCK_QUOTE, MOCK_QUOTE_WITH_IMG } from './Quote.mock';

storiesOf('v1/components/Quote', module)
	.addParameters({ jest: ['Quote'] })
	.add('Quote', () => <Quote {...MOCK_QUOTE_WITH_IMG} />)
	.add('Quote no avatar', () => <Quote {...MOCK_QUOTE} />);
