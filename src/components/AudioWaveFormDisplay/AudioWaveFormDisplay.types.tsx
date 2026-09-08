import type { DefaultComponentProps } from '../../types';
import { AudioWaveFormDisplaySize } from './AudioWaveFormDisplay.helpers';

export type AudioWaveFormDisplayProps = DefaultComponentProps & {
	waveColor?: string;
	backgroundColor?: string;
	size?: AudioWaveFormDisplaySize;
	ariaLabel?: string;
};
