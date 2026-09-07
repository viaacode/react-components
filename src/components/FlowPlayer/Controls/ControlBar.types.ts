import type { Player } from '@flowplayer/player';
import type { MutableRefObject } from 'react';
import type { Cuepoints, FlowPlayerCustomControlsConfig, FlowplayerTrackSchema } from '../FlowPlayer.types';

export interface ControlBarProps {
	playerRef: MutableRefObject<Player | null>;
	/** Only used to trigger re-subscription when the underlying player is (re)created. */
	playerInstance: unknown;
	config?: FlowPlayerCustomControlsConfig;
	isAudio: boolean;
	hasSubtitles: boolean;
	/** The original subtitles config - `subLabel`/`icon` live here, not on the runtime TextTrack objects (the browser API doesn't carry custom fields), so they're looked up by lang/label. */
	subtitles?: FlowplayerTrackSchema[];
	cuepoints?: Cuepoints;
	speed?: { options: number[]; labels: string[] };
	/** Mirrors native's `.is-starting .fp-controls{visibility:hidden}` - the bar stays hidden until
	 * the very first playback, same as native, instead of sitting on top of the poster on load. */
	hasStartedPlaying: boolean;
	/** The whole player root, not just the control bar's DOM node - needed for auto-hide and the title/logo overlay fade. */
	containerRef: MutableRefObject<HTMLDivElement | null>;
}
