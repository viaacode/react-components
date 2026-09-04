import { isNil } from '../../utils/is-nil';
import type { Cuepoints, GoogleAnalyticsEvent } from './FlowPlayer.types';

export function setPlayingVideoSeekTime(seekTime: number): void {
	const playingVideo: HTMLVideoElement | null = document.querySelector(
		'.c-video-player .is-playing video'
	) as HTMLVideoElement | null;
	if (playingVideo) {
		playingVideo.currentTime = seekTime;
	}
}

export function getPlayingVideoSeekTime(): number | null {
	const playingVideo: HTMLVideoElement | null = document.querySelector(
		'.c-video-player .is-playing video'
	) as HTMLVideoElement | null;
	if (playingVideo) {
		return playingVideo.currentTime;
	}
	return null;
}

export const convertGAEventsArrayToObject = (googleAnalyticsEvents: GoogleAnalyticsEvent[]) => {
	return googleAnalyticsEvents.reduce((acc: any, curr: GoogleAnalyticsEvent) => {
		acc[curr] = curr;

		return acc;
	}, {});
};

/** `isNil`, not truthy - a cuepoint at 0 is real and shouldn't be dropped as "not configured". */
export function getCuepointsForBar(
	start: number | null | undefined,
	end: number | null | undefined
): Cuepoints | undefined {
	if (isNil(start) && isNil(end)) {
		return undefined;
	}
	return [{ startTime: start, endTime: end }];
}
