import type { Cuepoints } from '../FlowPlayer.types';

export interface ProgressBarProps {
	currentTime: number;
	duration: number;
	bufferedEnd: number;
	onSeek: (time: number) => void;
	onSeekStart?: () => void;
	onSeekEnd?: () => void;
	showTimestamps?: boolean;
	cuepoints?: Cuepoints;
	accentColor: string;
	foregroundColor: string;
	ariaLabel: string;
}
