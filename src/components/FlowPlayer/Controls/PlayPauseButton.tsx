import type { FC } from 'react';
import { Button } from '../../Button';
import type { FlowPlayerControlsLabels } from '../FlowPlayer.types';
import { PauseIcon, PlayIcon } from './Controls.icons';

export interface PlayPauseButtonProps {
	paused: boolean;
	onToggle: () => void;
	labels: Required<FlowPlayerControlsLabels>;
}

export const PlayPauseButton: FC<PlayPauseButtonProps> = ({ paused, onToggle, labels }) => (
	<Button
		icon={paused ? <PlayIcon /> : <PauseIcon />}
		ariaLabel={paused ? labels.play : labels.pause}
		title={paused ? labels.play : labels.pause}
		onClick={onToggle}
		rootClassName="c-flowplayer-control-button"
	/>
);
