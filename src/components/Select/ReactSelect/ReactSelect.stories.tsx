import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { cloneElement, FC, ReactElement, ReactNode, useState } from 'react';
import { ActionMeta, OnChangeValue } from 'react-select';

import { SelectOption } from '../Select.types';
import { selectOptionsMock } from '../__mocks__/select';

import ReactSelect from './ReactSelect';

export default {
	title: 'Components/ReactSelect',
	component: ReactSelect,
} as ComponentMeta<typeof ReactSelect>;

const ReactSelectStoryComponent: FC<{ children?: ReactNode }> = ({ children }) => {
	const [value, setValue] = useState<SelectOption | null>(null);

	const onChange = (
		value: OnChangeValue<SelectOption, false>,
		meta: ActionMeta<SelectOption>
	) => {
		action('Changed')(value, meta);
		setValue(value);
	};

	return cloneElement(children as ReactElement, {
		value,
		onChange,
	});
};

const Template: ComponentStory<typeof ReactSelect> = (args) => (
	<ReactSelectStoryComponent>
		<ReactSelect {...args} />
	</ReactSelectStoryComponent>
);

export const Default = Template.bind({});
Default.args = { options: selectOptionsMock };
