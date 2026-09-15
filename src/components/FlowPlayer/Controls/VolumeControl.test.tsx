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
	cuepoint: 'Highlighted segment',
};

const renderVolumeControl = (overrides: Partial<VolumeControlProps> = {}) =>
	render(
		<VolumeControl
			id="test"
			volume={40}
			muted={false}
			onVolumeChange={jest.fn()}
			onToggleMute={jest.fn()}
			labels={defaultLabels}
			isOpen={false}
			onOpen={jest.fn()}
			onClose={jest.fn()}
			{...overrides}
		/>
	);

const getTrigger = (container: HTMLElement) =>
	container.querySelector('button') as HTMLButtonElement;

const ACTIVE_CLASS = 'c-flowplayer-control-button--active';

describe('<VolumeControl />', () => {
	// Dropdown keeps its content mounted and toggles `c-dropdown__content-closed`, so "closed" is
	// about the disclosure state rather than what's in the DOM.
	it('reports the flyout as collapsed while closed', () => {
		const { container } = renderVolumeControl();

		expect(getTrigger(container)).toHaveAttribute('aria-expanded', 'false');
		expect(getTrigger(container)).toHaveAttribute('aria-haspopup', 'dialog');
		expect(container.querySelector('.c-dropdown__content-closed')).toBeInTheDocument();
	});

	it('renders the bars and an in-flyout mute button when open', () => {
		const { container } = renderVolumeControl({ isOpen: true });

		expect(getTrigger(container)).toHaveAttribute('aria-expanded', 'true');
		expect(container.querySelector('[role="slider"]')).toBeInTheDocument();
		expect(container.querySelectorAll('button')).toHaveLength(2);
	});

	it('wires aria-controls to the flyout it opens', () => {
		const { container } = renderVolumeControl({ isOpen: true });

		const flyoutId = getTrigger(container).getAttribute('aria-controls');
		expect(flyoutId).toBeTruthy();
		expect(container.querySelector(`#${flyoutId}`)).toBeInTheDocument();
	});

	it('opens on trigger click', () => {
		const onOpen = jest.fn();
		const { container } = renderVolumeControl({ onOpen });

		getTrigger(container).click();

		expect(onOpen).toHaveBeenCalledTimes(1);
	});

	it('reflects the volume on the slider', () => {
		const { container } = renderVolumeControl({ isOpen: true, volume: 40 });

		expect(container.querySelector('[role="slider"]')).toHaveAttribute('aria-valuetext', '40%');
	});

	it('empties the bars while muted', () => {
		const { container } = renderVolumeControl({ isOpen: true, muted: true, volume: 40 });

		expect(container.querySelectorAll('.c-flowplayer-volume-bars__bar--filled')).toHaveLength(0);
	});

	// The highlight means "sound is on" - unmuted is the default, highlighted state.
	it('highlights the trigger while unmuted', () => {
		const { container } = renderVolumeControl({ muted: false });

		expect(getTrigger(container)).toHaveClass(ACTIVE_CLASS);
	});

	it('highlights the trigger while the flyout is open, even when muted', () => {
		const { container } = renderVolumeControl({ muted: true, isOpen: true });

		expect(getTrigger(container)).toHaveClass(ACTIVE_CLASS);
	});

	it('drops the highlight only when muted with the flyout closed', () => {
		const { container } = renderVolumeControl({ muted: true, isOpen: false });

		expect(getTrigger(container)).not.toHaveClass(ACTIVE_CLASS);
	});

	it('treats volume 0 as muted for the highlight', () => {
		const { container } = renderVolumeControl({ muted: false, volume: 0 });

		expect(getTrigger(container)).not.toHaveClass(ACTIVE_CLASS);
	});

	it('calls onToggleMute from the in-flyout button', () => {
		const onToggleMute = jest.fn();
		const { container } = renderVolumeControl({ isOpen: true, onToggleMute });

		const buttons = container.querySelectorAll('button');
		(buttons[1] as HTMLButtonElement).click();

		expect(onToggleMute).toHaveBeenCalledTimes(1);
	});
});
