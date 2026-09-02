import type { Meta, StoryObj } from '@storybook/react-vite';

import { AudioWaveFormDisplay } from './AudioWaveFormDisplay';

const meta: Meta<typeof AudioWaveFormDisplay> = {
	title: 'Components/AudioWaveFormDisplay',
	component: AudioWaveFormDisplay,
};
export default meta;
type Story = StoryObj<typeof AudioWaveFormDisplay>;

export const Default: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#111', padding: '1rem' }}>
			<div style={{ height: '4rem' }}>
				<AudioWaveFormDisplay ariaLabel="Waveform" size="small" waveColor="#fff" />
			</div>
			<div style={{ height: '4rem' }}>
				<AudioWaveFormDisplay ariaLabel="Waveform" size="large" waveColor="#00c8aa" />
			</div>
		</div>
	),
	args: {},
};

export const CustomColors: Story = {
	render: () => (
		<div style={{ height: '4rem' }}>
			<AudioWaveFormDisplay ariaLabel="Waveform" waveColor="#ff6b6b" backgroundColor="#1d1d1d" />
		</div>
	),
	args: {},
};
