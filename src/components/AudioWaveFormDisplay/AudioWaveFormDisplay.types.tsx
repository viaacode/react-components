import type { DefaultComponentProps } from '../../types';
import type { AudioWaveFormDisplaySize } from './AudioWaveFormDisplay.helpers';

export type { AudioWaveFormDisplaySize };

export type AudioWaveFormDisplayProps = DefaultComponentProps & {
	waveColor?: string;
	backgroundColor?: string;
	size?: AudioWaveFormDisplaySize;
	ariaLabel?: string;
};
