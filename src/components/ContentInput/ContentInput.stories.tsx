import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import ContentInput from './ContentInput';

export default {
	title: 'Components/ContentInput',
	component: ContentInput,
} as ComponentMeta<typeof ContentInput>;

const Template: ComponentStory<typeof ContentInput> = (props) => {
	const [value, setValue] = useState('');

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
	iconStart: '+',
	onCancel: () => console.info('cancel'),
	onConfirm: (v) => console.info('confirm', v),
};
