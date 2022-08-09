import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import ColorPicker from './ColorPicker';

export default {
	title: 'Components/ColorPicker',
	component: ColorPicker,
	argTypes: {
		color: {
			control: {
				type: 'color',
			},
		},
	},
} as ComponentMeta<typeof ColorPicker>;

const Template: ComponentStory<typeof ColorPicker> = (args) => {
	const [color, setColor] = useState<string>(args.color as string);

	return (
		<ColorPicker
			{...args}
			input={{
				id: 'ColorPicker',
			}}
			color={color}
			onChange={(newColor) => {
				action('color changed')(newColor);
				setColor(newColor);
			}}
		/>
	);
};

export const Default = Template.bind({});
Default.args = {
	color: '#00c8aa',
};

export const DefaultColor = Template.bind({});
DefaultColor.args = {
	color: '#FF0000',
};

export const Disabled = Template.bind({});
Disabled.args = {
	color: '#00c8aa',
	disabled: true,
};
