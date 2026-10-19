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

describe('<FlowPlayer /> onSubtitleTrackChange', () => {
	type FakeTrack = { kind: string; label: string; language: string; is_active: boolean };
	const buildTrack = (isActive = false): FakeTrack => ({
		kind: 'subtitles',
		label: 'Nederlands',
		language: 'nl',
		is_active: isActive,
	});

	// Renders a player and hands back the listener it registered for the plugin's own event
	const renderPlayerWithTrack = (
		track: FakeTrack,
		onSubtitleTrackChange?: (trackKey: string | null) => void
	) => {
		mockCreatePlayer.mockImplementationOnce((container: HTMLElement) => {
			const video = document.createElement('video');
			video.className = 'fp-engine';
			container.appendChild(video);
			// A getter on the element in jsdom: a plain array stands in for the TextTrackList
			Object.defineProperty(video, 'textTracks', { value: [track] });
			return Object.assign(video, {
				root: container,
				on: jest.fn(),
				once: jest.fn(),
				destroy: jest.fn(),
				setOpts: jest.fn(),
			});
		});
		render(
			<FlowPlayerInternal
				src="https://example.com/video.mp4"
				type="video"
				onSubtitleTrackChange={onSubtitleTrackChange}
			/>
		);
		const player = mockCreatePlayer.mock.results[0].value;
		const registration = player.on.mock.calls.find(
			([event]: [string]) => event === 'tracks:text:updated'
		);
		return registration[1] as () => void;
	};

	beforeEach(() => {
		mockCreatePlayer.mockClear();
		jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('reports the key of a track that is switched on, and null when it is switched off again', () => {
		const track = buildTrack();
		const onSubtitleTrackChange = jest.fn();
		const emitUpdated = renderPlayerWithTrack(track, onSubtitleTrackChange);

		track.is_active = true;
		emitUpdated();
		track.is_active = false;
		emitUpdated();

		expect(onSubtitleTrackChange).toHaveBeenNthCalledWith(1, 'nl');
		expect(onSubtitleTrackChange).toHaveBeenNthCalledWith(2, null);
	});

	it('does not report an update that left the track as it was', () => {
		const onSubtitleTrackChange = jest.fn();
		const emitUpdated = renderPlayerWithTrack(buildTrack(), onSubtitleTrackChange);

		emitUpdated();

		expect(onSubtitleTrackChange).not.toHaveBeenCalled();
	});

	it('does not report the track that was already on when the player started', () => {
		const onSubtitleTrackChange = jest.fn();
		const emitUpdated = renderPlayerWithTrack(buildTrack(true), onSubtitleTrackChange);

		emitUpdated();

		expect(onSubtitleTrackChange).not.toHaveBeenCalled();
	});

	it('does not need a callback', () => {
		const track = buildTrack();
		const emitUpdated = renderPlayerWithTrack(track);

		track.is_active = true;

		expect(() => emitUpdated()).not.toThrow();
	});
});
