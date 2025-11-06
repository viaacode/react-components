import type { Meta, StoryObj } from '@storybook/react';
import React, { cloneElement, type FC, type ReactElement, type ReactNode, useState } from 'react';
import type { ActionMeta, OnChangeValue } from 'react-select';
import { action } from 'storybook/actions';

import type { SelectOption } from '../Select.types.js';
import { selectOptionsMock } from '../__mocks__/select.js';

import ReactSelect from './ReactSelect.js';

const meta: Meta<typeof ReactSelect> = {
	component: ReactSelect,
	title: 'Components/ReactSelect',
};
export default meta;
type Story = StoryObj<typeof ReactSelect>;

const ReactSelectStoryComponent: FC<{ children?: ReactNode }> = ({ children }) => {
	const [value, setValue] = useState<SelectOption | null>(null);

	const onChange = (value: OnChangeValue<SelectOption, false>, meta: ActionMeta<SelectOption>) => {
		action('Changed')(value, meta);
		setValue(value);
	};

	return cloneElement(children as ReactElement, {
		value,
		onChange,
	});
};

export const Default: Story = {
	args: {
		options: selectOptionsMock,
	},
	render: (args) => (
		<ReactSelectStoryComponent>
			<ReactSelect {...args} />
		</ReactSelectStoryComponent>
	),
};
