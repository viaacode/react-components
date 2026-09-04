import clsx from 'clsx';
import type { FC } from 'react';
import { Button } from '../../Button';
import type { FlowPlayerControlsLabels } from '../FlowPlayer.types';
import { MuteIcon, VolumeIcon } from './Controls.icons';

export interface VolumeControlProps {
	muted: boolean;
	onToggleMute: () => void;
	labels: Required<FlowPlayerControlsLabels>;
}

/** No flyout/slider - a plain mute/unmute toggle, backed by `muted` rather than `volume` so it
 * rides Flowplayer's own generic mute persistence (unlike volume, that one isn't tied to its
 * native volume-bar widget - it already survives a reload with no extra code). */
export const VolumeControl: FC<VolumeControlProps> = ({ muted, onToggleMute, labels }) => (
	<Button
		icon={muted ? <MuteIcon /> : <VolumeIcon />}
		ariaLabel={muted ? labels.unmute : labels.mute}
		title={muted ? labels.unmute : labels.mute}
		onClick={onToggleMute}
		rootClassName="c-flowplayer-control-button"
		className={clsx('c-flowplayer-control-button--slot', {
			'c-flowplayer-control-button--active': muted,
		})}
	/>
);
