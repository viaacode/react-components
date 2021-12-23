import { storiesOf } from '@storybook/react';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';

import { Box } from './Box';

const content = loremIpsum({ count: 10 });

storiesOf('v1/components/Box', module)
	.addParameters({ jest: ['Box'] })
	.add('Box', () => <Box>{content}</Box>)
	.add('Condensed Box', () => <Box condensed>{content}</Box>)
	.add('Box with Background', () => <Box backgroundColor="white">{content}</Box>);
