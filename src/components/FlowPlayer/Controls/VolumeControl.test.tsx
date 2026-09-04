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
	render(<VolumeControl muted={false} onToggleMute={jest.fn()} labels={defaultLabels} {...overrides} />);

const getButton = (container: HTMLElement) => container.querySelector('button') as HTMLButtonElement;

describe('<VolumeControl />', () => {
	it('does not mark the button active when unmuted', () => {
		const { container } = renderVolumeControl({ muted: false });

		expect(getButton(container)).not.toHaveClass('c-flowplayer-control-button--active');
	});

	it('marks the button active when muted', () => {
		const { container } = renderVolumeControl({ muted: true });

		expect(getButton(container)).toHaveClass('c-flowplayer-control-button--active');
	});

	it('calls onToggleMute when clicked', () => {
		const onToggleMute = jest.fn();
		const { container } = renderVolumeControl({ onToggleMute });

		getButton(container).click();

		expect(onToggleMute).toHaveBeenCalledTimes(1);
	});
});
