import { render } from '@testing-library/react';
import { createRef } from 'react';
import { ControlBar } from './ControlBar';
import type { ControlBarProps } from './ControlBar.types';

const buildProps = (): ControlBarProps => ({
	playerRef: createRef(),
	playerInstance: null,
	isAudio: false,
	hasSubtitles: false,
	containerRef: createRef(),
	hasStartedPlaying: true,
});

describe('<ControlBar />', () => {
	it('renders without a player instance yet', () => {
		const { container } = render(<ControlBar {...buildProps()} />);

		expect(container.querySelector('.c-flowplayer-control-bar')).toBeInTheDocument();
	});

	it('gives the speed dropdown a unique id per instance, instead of a shared hardcoded one', () => {
		// Regression: the volume/subtitles/speed dropdowns used a hardcoded `id="flowplayer-controls"`
		// with no per-instance identifier, so two players with custom controls on the same page
		// (a grid, a playlist) produced duplicate DOM ids - invalid HTML and broken aria-controls
		// association for every instance after the first.
		const speedProps = { ...buildProps(), speed: { options: [1], labels: ['1x'] } };
		const { container } = render(
			<>
				<ControlBar {...speedProps} />
				<ControlBar {...speedProps} />
			</>
		);

		const flyouts = container.querySelectorAll('.c-flowplayer-speed-flyout');
		expect(flyouts).toHaveLength(2);

		const ids = Array.from(flyouts).map((el) => el.id);
		expect(ids[0]).toBeTruthy();
		expect(ids[1]).toBeTruthy();
		expect(ids[0]).not.toEqual(ids[1]);
		expect(ids[0]).not.toEqual('flowplayer-controls__speed');
	});
});
