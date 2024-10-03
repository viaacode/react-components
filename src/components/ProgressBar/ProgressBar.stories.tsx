import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import ProgressBar from './ProgressBar';

export default {
	title: 'Components/ProgressBar',
	component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = () => (
	<div style={{ maxWidth: '30rem' }}>
		<ProgressBar percentage={0} />
		<br />
		<ProgressBar percentage={10} />
		<br />
		<ProgressBar percentage={50} />
		<br />
		<ProgressBar percentage={90} />
		<br />
		<ProgressBar percentage={100} />
	</div>
);

export const Default = Template.bind({});
Default.args = {};
