import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import { TextInput } from '../TextInput';

import Timepicker from './Timepicker';
import { futureTimepicker, timepicker } from './Timepicker.const';

export default {
	title: 'Components/Timepicker',
	component: Timepicker,
} as ComponentMeta<typeof Timepicker>;

const Template: ComponentStory<typeof Timepicker> = (props) => {
	const [date, setDate] = useState(new Date());

	return (
		<Timepicker {...props} selected={date} onChange={(date: Date) => date && setDate(date)} />
	);
};

export const Default = Template.bind({});
Default.args = {
	...timepicker,
};

export const Future = Template.bind({});
Future.args = {
	...futureTimepicker,
};

export const WithInput = Template.bind({});
WithInput.args = {
	...futureTimepicker,
	customInput: <TextInput iconStart="clock" />,
};
