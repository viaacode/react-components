import { storiesOf } from '@storybook/react';
import { loremIpsum } from 'lorem-ipsum';
import React, { Fragment } from 'react';

import { Flex } from './Flex';
import { FlexItem } from './FlexItem/FlexItem';

const content1 = loremIpsum({ count: 1 });
const content2 = loremIpsum({ count: 4 });
const content3 = loremIpsum({ count: 2 });

const dummyFlexItems = (
	<Fragment>
		<FlexItem>{content1}</FlexItem>
		<FlexItem>{content2}</FlexItem>
		<FlexItem>{content3}</FlexItem>
	</Fragment>
);

storiesOf('components/Flex', module)
	.addParameters({ jest: ['Flex'] })
	.add('Flex', () => <Flex>{dummyFlexItems}</Flex>)
	.add('Flex (horizontal)', () => <Flex orientation="horizontal">{dummyFlexItems}</Flex>)
	.add('Flex (vertical)', () => <Flex orientation="vertical">{dummyFlexItems}</Flex>)
	.add('Flex (center)', () => <Flex center>{dummyFlexItems}</Flex>)
	.add('Flex (vertical - center)', () => (
		<Flex orientation="vertical" center>
			{dummyFlexItems}
		</Flex>
	))
	.add('Flex (horizontal - center)', () => (
		<Flex orientation="horizontal" center>
			{dummyFlexItems}
		</Flex>
	))
	.add('Flex (justify)', () => <Flex justify="between">{dummyFlexItems}</Flex>)
	.add('Flex (wrapped)', () => <Flex wrap>{dummyFlexItems}</Flex>)
	.add('Flex (spaced - regular)', () => <Flex spaced="regular">{dummyFlexItems}</Flex>)
	.add('Flex (spaced - wide)', () => <Flex spaced="wide">{dummyFlexItems}</Flex>);
