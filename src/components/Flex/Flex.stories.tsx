import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';

import { Flex } from './Flex';
import { FlexItem } from './FlexItem/FlexItem';

const content1 = loremIpsum({ count: 1 });
const content2 = loremIpsum({ count: 4 });
const content3 = loremIpsum({ count: 2 });

export default {
	title: 'Components/Flex',
	component: Flex,
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => (
	<Flex {...args}>
		{' '}
		<FlexItem>{content1}</FlexItem>
		<FlexItem>{content2}</FlexItem>
		<FlexItem>{content3}</FlexItem>
	</Flex>
);

export const Basic = Template.bind({});
Basic.args = {};

export const Horizontal = Template.bind({});
Horizontal.args = {
	orientation: 'horizontal',
};

export const Vertical = Template.bind({});
Vertical.args = {
	orientation: 'vertical',
};

export const Center = Template.bind({});
Center.args = {
	center: true,
};

export const HorizontalCenter = Template.bind({});
HorizontalCenter.args = {
	center: true,
	orientation: 'horizontal',
};

export const VerticalCenter = Template.bind({});
VerticalCenter.args = {
	center: true,
	orientation: 'vertical',
};

export const Justified = Template.bind({});
Justified.args = {
	justify: 'between',
};

export const Wrapped = Template.bind({});
Wrapped.args = {
	wrap: true,
};

export const SpacedRegular = Template.bind({});
SpacedRegular.args = {
	spaced: 'regular',
};

export const SpacedWide = Template.bind({});
SpacedWide.args = {
	spaced: 'wide',
};
