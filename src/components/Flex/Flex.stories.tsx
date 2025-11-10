import type { Meta, StoryObj } from '@storybook/react-vite';
import { loremIpsum } from 'lorem-ipsum';

import { Flex } from './Flex.js';
import { FlexItem } from './FlexItem/FlexItem.js';

const content1 = loremIpsum({ count: 1 });
const content2 = loremIpsum({ count: 4 });
const content3 = loremIpsum({ count: 2 });

const meta: Meta<typeof Flex> = {
	title: 'Components/Flex',
	component: Flex,
};
export default meta;
type Story = StoryObj<typeof Flex>;

const FlexTemplate = (args: any) => (
	<Flex {...args}>
		<FlexItem>{content1}</FlexItem>
		<FlexItem>{content2}</FlexItem>
		<FlexItem>{content3}</FlexItem>
	</Flex>
);

export const Basic: Story = {
	args: {},
	render: FlexTemplate,
};
export const Horizontal: Story = {
	args: { orientation: 'horizontal' },
	render: FlexTemplate,
};
export const Vertical: Story = {
	args: { orientation: 'vertical' },
	render: FlexTemplate,
};
export const Center: Story = {
	args: { center: true },
	render: FlexTemplate,
};
export const HorizontalCenter: Story = {
	args: { center: true, orientation: 'horizontal' },
	render: FlexTemplate,
};
export const VerticalCenter: Story = {
	args: { center: true, orientation: 'vertical' },
	render: FlexTemplate,
};
export const Justified: Story = {
	args: { justify: 'between' },
	render: FlexTemplate,
};
export const Wrapped: Story = {
	args: { wrap: true },
	render: FlexTemplate,
};
export const SpacedRegular: Story = {
	args: { spaced: 'regular' },
	render: FlexTemplate,
};
export const SpacedWide: Story = {
	args: { spaced: 'wide' },
	render: FlexTemplate,
};
