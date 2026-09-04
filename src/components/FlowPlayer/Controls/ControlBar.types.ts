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
	/** The whole player root, not just the control bar's DOM node - needed for auto-hide and the title/logo overlay fade. */
	containerRef: MutableRefObject<HTMLDivElement | null>;
}
