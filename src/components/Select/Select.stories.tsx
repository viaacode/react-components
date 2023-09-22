import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { ChangeEvent, cloneElement, FC, ReactElement, ReactNode, useState } from 'react';

import Select from './Select';
import { selectOptionsMock } from './__mocks__/select';

export default {
	title: 'Components/Select',
	component: Select,
} as ComponentMeta<typeof Select>;

const SelectStoryComponent: FC<{ children?: ReactNode }> = ({ children }) => {
	const [value, setValue] = useState('');

	const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
		action(`onChange: ${e.target.value}`)();
		setValue(e.target.value);
	};

	return cloneElement(children as ReactElement, {
		value,
		onChange,
	});
};

const Template: ComponentStory<typeof Select> = (args) => (
	<SelectStoryComponent>
		<Select {...args} />
	</SelectStoryComponent>
);

export const Default = Template.bind({});
Default.args = {
	options: selectOptionsMock,
};
