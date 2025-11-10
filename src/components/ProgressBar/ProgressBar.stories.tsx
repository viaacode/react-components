import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressBar } from './ProgressBar.js';

const meta: Meta<typeof ProgressBar> = {
	title: 'Components/ProgressBar',
	component: ProgressBar,
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
	render: () => (
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
	),
	args: {},
};
