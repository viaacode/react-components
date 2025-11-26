import type { Meta, StoryObj } from '@storybook/react';
import { cloneElement, type ReactElement, useState } from 'react';
import { action } from 'storybook/actions';

import TimeCropControls from './TimeCropControls';

const TimeCropControlsStoryComponent = ({ children }: { children: ReactElement }) => {
	const [startTime, setStartTime] = useState(0);
	const [endTime, setEndTime] = useState(0);

	return cloneElement(children, {
		startTime,
		endTime,
		onChange: (newStartTime: number, newEndTime: number) => {
			action('Input changed')(newStartTime, newEndTime);
			setStartTime(newStartTime);
			setEndTime(newEndTime);
		},
	});
};

const meta: Meta<typeof TimeCropControls> = {
	title: 'Components/TimeCropControls',
	component: TimeCropControls,
};
export default meta;
type Story = StoryObj<typeof TimeCropControls>;

const Template = (args: any) => (
	<TimeCropControlsStoryComponent>
		<TimeCropControls {...args} trackColor="#AC9999FF" highlightColor="#8d0000" />
	</TimeCropControlsStoryComponent>
);

export const Default: Story = {
	args: {
		startTime: 0,
		endTime: 14000,
		minTime: 0,
		maxTime: 14000,
	},
	render: Template,
};
