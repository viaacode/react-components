import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import ContentInput from './ContentInput';

const meta: Meta<typeof ContentInput> = {
	title: 'Components/ContentInput',
	component: ContentInput,
};
export default meta;
type Story = StoryObj<typeof ContentInput>;

const StatefulContentInput = (props: any) => {
	const [value, setValue] = useState(props.value || '');
	return <ContentInput {...props} onChange={(e) => setValue(e.target.value)} value={value} />;
};

export const Default: Story = {
	args: {
		iconStart: () => '+',
		onCancel: () => console.info('cancel'),
		onConfirm: (v) => Promise.resolve(console.info('confirm', v)),
	},
	render: StatefulContentInput,
};

export const CustomButtons: Story = {
	args: {
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
	},
	render: StatefulContentInput,
};
