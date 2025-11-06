import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { TextInput } from '../TextInput/index.js';
import FormControl from './FormControl.js';

const meta: Meta<typeof FormControl> = {
	title: 'Components/FormControl',
	component: FormControl,
};
export default meta;
type Story = StoryObj<typeof FormControl>;

const name = 'name';

export const Basic: Story = {
	args: {
		children: <TextInput id={name} />,
	},
};

export const Label: Story = {
	args: {
		...Basic.args,
		id: name,
		label: 'Your first name',
	},
};

export const Required: Story = {
	args: {
		...Basic.args,
		id: name,
		suffix: <i>(Optioneel)</i>,
		label: <b>Email</b>,
	},
};

export const Errors: Story = {
	args: {
		...Label.args,
		errors: [`Something went wrong while validating your ${name}.`],
	},
};

export const Disabled: Story = {
	args: {
		...Errors.args,
		disabled: true,
	},
};
