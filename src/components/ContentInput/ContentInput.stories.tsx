import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import ContentInput from './ContentInput';

export default {
	title: 'Components/ContentInput',
	component: ContentInput,
} as ComponentMeta<typeof ContentInput>;

const Template: ComponentStory<typeof ContentInput> = (props) => {
	const [value, setValue] = useState(props.value || '');

	return (
		<ContentInput
			{...props}
			onChange={(e) => {
				setValue(e.target.value);
			}}
			value={value}
		/>
	);
};

export const Default = Template.bind({});
Default.args = {
	iconStart: () => '+',
	onCancel: () => console.info('cancel'),
	onConfirm: (v) => Promise.resolve(console.info('confirm', v)),
};

export const CustomButtons = Template.bind({});
CustomButtons.args = {
	iconEnd: () => (
		<>
			<button type="button">1</button>
			<button type="button" onClick={() => console.info('test button click 2')}>
				2
			</button>
			<button type="button">3</button>
		</>
	),
	onCancel: () => console.info('cancel'),
	onConfirm: (v) => Promise.resolve(console.info('confirm', v)),
	value: 'banaan',
};
