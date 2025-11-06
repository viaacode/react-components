import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { action } from 'storybook/actions';

import ColorPicker from './ColorPicker.js';

const meta: Meta<typeof ColorPicker> = {
	title: 'Components/ColorPicker',
	component: ColorPicker,
	argTypes: {
		color: {
			control: {
				type: 'color',
			},
		},
	},
};
export default meta;
type Story = StoryObj<typeof ColorPicker>;

const StatefulColorPicker = (args: any) => {
	const [color, setColor] = useState<string>(args.color as string);
	return (
		<ColorPicker
			{...args}
			input={{ id: 'ColorPicker' }}
			color={color}
			onChange={(newColor) => {
				action('color changed')(newColor);
				setColor(newColor);
			}}
		/>
	);
};

export const Default: Story = {
	args: {
		color: '#00c8aa',
	},
	render: StatefulColorPicker,
};

export const DefaultColor: Story = {
	args: {
		color: '#FF0000',
	},
	render: StatefulColorPicker,
};

export const Disabled: Story = {
	args: {
		color: '#00c8aa',
		disabled: true,
	},
	render: StatefulColorPicker,
};
