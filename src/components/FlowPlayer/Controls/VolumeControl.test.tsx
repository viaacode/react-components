import { render } from '@testing-library/react';
import { VolumeControl, type VolumeControlProps } from './VolumeControl';

const defaultLabels = {
	play: 'Play',
	pause: 'Pause',
	mute: 'Mute',
	unmute: 'Unmute',
	volume: 'Volume',
	fullscreenEnter: 'Enter fullscreen',
	fullscreenExit: 'Exit fullscreen',
	subtitles: 'Subtitles',
	subtitlesOff: 'Off',
	speed: 'Speed',
	progressBar: 'Progress',
};

const renderVolumeControl = (overrides: Partial<VolumeControlProps> = {}) =>
	render(
		<VolumeControl
			id="test"
			volume={50}
			muted={false}
			onVolumeChange={jest.fn()}
			onToggleMute={jest.fn()}
			accentColor="#000"
			flyoutBackground="#fff"
			flyoutForegroundColor="#000"
			labels={defaultLabels}
			isOpen={false}
			onOpen={jest.fn()}
			onClose={jest.fn()}
			{...overrides}
		/>
	);

// The flyout content (including VolumeBars, which also carries `aria-label="Volume"`) is always
// present in the DOM - Menu only toggles a visibility class, it doesn't unmount on `isOpen: false`
// - so queries must target the trigger `<button>` specifically, not just the "Volume" label.
const getTrigger = (container: HTMLElement) =>
	container.querySelector('button[aria-label="Volume"]') as HTMLButtonElement;

describe('<VolumeControl />', () => {
	it('does not mark the trigger active when unmuted and the flyout is closed', () => {
		const { container } = renderVolumeControl({ muted: false, volume: 50, isOpen: false });

		expect(getTrigger(container)).not.toHaveClass('c-flowplayer-control-button--active');
	});

	it('marks the trigger active when muted, even while the flyout is closed', () => {
		// Regression: only `isOpen` drove the `--active` background, so muting while the flyout
		// was closed left the trigger visually indistinguishable from unmuted (ControlBar.scss
		// documents `--active` as covering both "toggled on (e.g. muted)" and "flyout open").
		const { container } = renderVolumeControl({ muted: true, volume: 50, isOpen: false });

		expect(getTrigger(container)).toHaveClass('c-flowplayer-control-button--active');
	});

	it('marks the trigger active when volume is 0, even while the flyout is closed', () => {
		const { container } = renderVolumeControl({ muted: false, volume: 0, isOpen: false });

		expect(getTrigger(container)).toHaveClass('c-flowplayer-control-button--active');
	});

	it('marks the trigger active when the flyout is open, regardless of mute state', () => {
		const { container } = renderVolumeControl({ muted: false, volume: 50, isOpen: true });

		expect(getTrigger(container)).toHaveClass('c-flowplayer-control-button--active');
	});
});
