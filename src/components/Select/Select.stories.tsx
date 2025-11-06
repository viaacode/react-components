import type { Meta, StoryObj } from '@storybook/react';
import React, {
	type ChangeEvent,
	cloneElement,
	type FC,
	type ReactElement,
	type ReactNode,
	useState,
} from 'react';
import { action } from 'storybook/actions';

import Select from './Select.js';
import { selectOptionsMock } from './__mocks__/select.js';

const meta: Meta<typeof Select> = {
	title: 'Components/Select',
	component: Select,
};
export default meta;
type Story = StoryObj<typeof Select>;

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

export const Default: Story = {
	args: {
		options: selectOptionsMock,
	},
	render: (args) => (
		<SelectStoryComponent>
			<Select {...args} />
		</SelectStoryComponent>
	),
};
