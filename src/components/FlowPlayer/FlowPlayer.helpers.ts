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

/**
 * `isNil`, not truthy - a cuepoint starting at 0 (`start: 0, end: undefined`) is a real, valid
 * cuepoint, not the same as "no cuepoint configured" (`0 || undefined` would otherwise be falsy
 * and silently drop it). Matches the same null-check FlowPlayer.internal.tsx's own
 * `updateCuepointPosition` already uses for these same values.
 */
export function getCuepointsForBar(
	start: number | null | undefined,
	end: number | null | undefined
): Cuepoints | undefined {
	if (isNil(start) && isNil(end)) {
		return undefined;
	}
	return [{ startTime: start, endTime: end }];
}
