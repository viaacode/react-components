import type { Player } from '@flowplayer/player';
import type { MutableRefObject } from 'react';
import type { Cuepoints, FlowPlayerCustomControlsConfig } from '../FlowPlayer.types';

export interface ControlBarProps {
	playerRef: MutableRefObject<Player | null>;
	/** Only used to trigger re-subscription when the underlying player is (re)created. */
	playerInstance: unknown;
	config?: FlowPlayerCustomControlsConfig;
	isAudio: boolean;
	hasSubtitles: boolean;
	cuepoints?: Cuepoints;
	speed?: { options: number[]; labels: string[] };
	/**
	 * The whole player root (`.c-video-player-inner`), not just the control bar's own DOM node -
	 * used so auto-hide reacts to activity anywhere over the player, and so the title/logo
	 * overlays (owned by FlowPlayer.internal.tsx, not this component) can fade in sync with the
	 * control bar via a class toggled on this same element.
	 */
	containerRef: MutableRefObject<HTMLDivElement | null>;
}
