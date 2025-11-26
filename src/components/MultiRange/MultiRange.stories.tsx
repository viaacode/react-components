import type { Meta, StoryObj } from '@storybook/react';
import { cloneElement, type ReactElement, useState } from 'react';
import { action } from 'storybook/actions';

import MultiRange from './MultiRange';
import './MultiRange.stories.scss';

const MultiRangeStoryComponent = ({ children }: { children: ReactElement }) => {
	const [values, setValues] = useState<number[] | undefined>(undefined);

	return cloneElement(children, {
		values,
		onChange: (values: number[]) => {
			action('Input changed')(values);
			setValues(values);
		},
	});
};

const meta: Meta<typeof MultiRange> = {
	title: 'Components/MultiRange',
	component: MultiRange,
};
export default meta;
type Story = StoryObj<typeof MultiRange>;

const Template = (args: any) => (
	<MultiRangeStoryComponent>
		<MultiRange {...args} trackColor="#AC9999FF" highlightColor="#8d0000" />
	</MultiRangeStoryComponent>
);

export const Default: Story = {
	args: {},
	render: Template,
};

export const MultiRangeDisabled: Story = {
	args: { disabled: true },
	render: Template,
};

export const MultiRangeAllowOverlap: Story = {
	args: { allowOverlap: true, onChange: action('Value changed') },
	render: Template,
};

export const MultiRangeWithValues: Story = {
	args: { values: [20, 60] },
	render: Template,
};

export const MultiRangeSingleValue: Story = {
	args: { values: [20] },
	render: Template,
};

export const MultiRangeWithNumberField: Story = {
	args: { values: [20], showNumber: true },
	render: Template,
};
