import type { FC } from 'react';
import { Button } from '../../Button';
import type { FlowPlayerControlsLabels } from '../FlowPlayer.types';
import { FullscreenEnterIcon, FullscreenExitIcon } from './Controls.icons';

export interface FullscreenButtonProps {
	isFullscreen: boolean;
	onToggle: () => void;
	labels: Required<FlowPlayerControlsLabels>;
}

export const FullscreenButton: FC<FullscreenButtonProps> = ({ isFullscreen, onToggle, labels }) => (
	<Button
		icon={isFullscreen ? <FullscreenExitIcon /> : <FullscreenEnterIcon />}
		ariaLabel={isFullscreen ? labels.fullscreenExit : labels.fullscreenEnter}
		title={isFullscreen ? labels.fullscreenExit : labels.fullscreenEnter}
		onClick={onToggle}
		rootClassName="c-flowplayer-control-button"
	/>
);
