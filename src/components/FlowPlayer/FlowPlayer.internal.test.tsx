import { render } from '@testing-library/react';

import FlowPlayerInternal from './FlowPlayer.internal';

// Flowplayer drives a real <video>, which jsdom can't play: the player it hands back is a bare video
// element in the container, like the real one (the player is the video.fp-engine element itself)
const mockCreatePlayer = jest.fn((container: HTMLElement) => {
	const video = document.createElement('video');
	video.className = 'fp-engine';
	container.appendChild(video);
	return Object.assign(video, {
		root: container,
		on: jest.fn(),
		once: jest.fn(),
		destroy: jest.fn(),
		setOpts: jest.fn(),
	});
});

jest.mock('@flowplayer/player', () => {
	const withPlugins = Object.assign((...args: [HTMLElement]) => mockCreatePlayer(...args), {
		events: { CUEPOINT_END: 'cuepointend' },
		autoplay: { ON: 1, OFF: 0 },
		ui: { LOGO_ON_RIGHT: 1, USE_DRAG_HANDLE: 2, NO_CONTROLS: 4 },
	});
	return {
		__esModule: true,
		default: Object.assign(() => withPlugins, { i18n: {} }),
	};
});
jest.mock('@flowplayer/player/plugins/audio', () => ({ __esModule: true, default: {} }));
jest.mock('@flowplayer/player/plugins/cuepoints', () => ({ __esModule: true, default: {} }));
jest.mock('@flowplayer/player/plugins/google-analytics', () => ({ __esModule: true, default: {} }));
jest.mock('@flowplayer/player/plugins/hls', () => ({ __esModule: true, default: {} }));
jest.mock('@flowplayer/player/plugins/keyboard', () => ({ __esModule: true, default: {} }));
jest.mock('@flowplayer/player/plugins/playlist', () => ({
	__esModule: true,
	default: { events: { PLAYLIST_NEXT: 'playlistnext' } },
}));
jest.mock('@flowplayer/player/plugins/speed', () => ({ __esModule: true, default: {} }));
jest.mock('@flowplayer/player/plugins/subtitles', () => ({ __esModule: true, default: {} }));
jest.mock('./FlowPlayer.commands', () => ({ registerCommands: jest.fn() }));

const renderPlayer = (onReady?: (video: HTMLVideoElement) => void) =>
	render(<FlowPlayerInternal src="https://example.com/video.mp4" type="video" onReady={onReady} />);

describe('<FlowPlayer /> onReady', () => {
	beforeEach(() => {
		mockCreatePlayer.mockClear();
		// jsdom doesn't implement media playback and logs an error for it
		jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('hands over the video element Flowplayer drives', () => {
		const onReady = jest.fn();

		const { container } = renderPlayer(onReady);

		expect(onReady).toHaveBeenCalledTimes(1);
		const video = onReady.mock.calls[0][0] as HTMLVideoElement;
		expect(video).toBeInstanceOf(HTMLVideoElement);
		expect(video).toBe(container.querySelector('video.fp-engine'));
	});

	it('hands it over once the element is in the page, before any media event', () => {
		let wasInPage = false;
		let readyState = -1;

		renderPlayer((video) => {
			wasInPage = document.body.contains(video);
			readyState = video.readyState;
		});

		expect(wasInPage).toBe(true);
		// Nothing has loaded: the callback does not wait for loadeddata, which iOS doesn't fire before playback
		expect(readyState).toBe(0);
	});

	it('does not need a callback', () => {
		expect(() => renderPlayer()).not.toThrow();
	});

	it('does not initialise the player again when the callback changes every render', () => {
		const first = jest.fn();
		const second = jest.fn();
		const { rerender } = renderPlayer(first);

		rerender(
			<FlowPlayerInternal src="https://example.com/video.mp4" type="video" onReady={second} />
		);

		expect(mockCreatePlayer).toHaveBeenCalledTimes(1);
		expect(first).toHaveBeenCalledTimes(1);
		expect(second).not.toHaveBeenCalled();
	});

	it('calls the latest callback for a player that is mounted again, e.g. with another key', () => {
		const first = jest.fn();
		const second = jest.fn();
		const { rerender } = render(
			<FlowPlayerInternal
				key="a"
				src="https://example.com/video.mp4"
				type="video"
				onReady={first}
			/>
		);

		rerender(
			<FlowPlayerInternal
				key="b"
				src="https://example.com/other.mp4"
				type="video"
				onReady={second}
			/>
		);

		expect(mockCreatePlayer).toHaveBeenCalledTimes(2);
		expect(first).toHaveBeenCalledTimes(1);
		expect(second).toHaveBeenCalledTimes(1);
	});
});
