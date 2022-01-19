import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import { TextInput } from '../TextInput';

import Datepicker from './Datepicker';
import { future, historic } from './Datepicker.const';

export default {
	title: 'Components/Datepicker',
	component: Datepicker,
} as ComponentMeta<typeof Datepicker>;

const Template: ComponentStory<typeof Datepicker> = (props) => {
	const [date, setDate] = useState(new Date());

	return <Datepicker {...props} selected={date} onChange={(date) => date && setDate(date)} />;
};

export const Future = Template.bind({});
Future.args = {
	...future,
};

export const Historic = Template.bind({});
Historic.args = {
	...historic,
};

export const WithInput = Template.bind({});
WithInput.args = {
	...future,
	customInput: <TextInput iconStart="calendar" />,
};
