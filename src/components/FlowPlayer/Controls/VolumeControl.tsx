import clsx from 'clsx';
import { type FC, useEffect, useRef } from 'react';
import { Button } from '../../Button';
import Dropdown from '../../Dropdown/Dropdown';
import { DropdownButton, DropdownContent } from '../../Dropdown/Dropdown.slots';
import type { FlowPlayerControlsLabels } from '../FlowPlayer.types';
import { MuteHighlightedIcon, MuteIcon, VolumeHighlightedIcon, VolumeIcon } from './Controls.icons';
import { VolumeBars } from './VolumeBars';

export interface VolumeControlProps {
	id: string;
	volume: number; // 0-100
	muted: boolean;
	steps?: number;
	onVolumeChange: (value: number) => void;
	onToggleMute: () => void;
	labels: FlowPlayerControlsLabels;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

/**
 * Uses `Dropdown` directly rather than `ControlFlyout`, which is a radio option list - a slider
 * shares none of its option/check structure.
 */
export const VolumeControl: FC<VolumeControlProps> = ({
	id,
	volume,
	muted,
	steps,
	onVolumeChange,
	onToggleMute,
	labels,
	isOpen,
	onOpen,
	onClose,
}) => {
	const flyoutId = `${id}__volume`;
	const isMutedVisually = muted || volume === 0;
	const muteButtonRef = useRef<HTMLButtonElement>(null);

	// A keyboard user should land inside the flyout on open, like a native dialog - the arrow keys
	// stay with VolumeBars rather than being spent moving between the mute button and the bars.
	useEffect(() => {
		if (isOpen) {
			muteButtonRef.current?.focus();
		}
	}, [isOpen]);

	return (
		<Dropdown
			id={flyoutId}
			isOpen={isOpen}
			onOpen={onOpen}
			onClose={onClose}
			placement="top-start"
			menuWidth="fit-content"
			flyoutClassName="c-flowplayer-volume-flyout"
			shiftPadding={8}
			// `dialog`, not `menu`: focus moves in when it opens, but the arrow keys stay with
			// VolumeBars rather than being spent navigating between the two controls in here.
			keyboard="dialog"
		>
			<DropdownButton>
				<Button
					icon={
						isOpen ? (
							isMutedVisually ? (
								<MuteHighlightedIcon />
							) : (
								<VolumeHighlightedIcon />
							)
						) : isMutedVisually ? (
							<MuteIcon />
						) : (
							<VolumeIcon />
						)
					}
					ariaLabel={labels.volume}
					title={labels.volume}
					aria-haspopup="dialog"
					aria-expanded={isOpen}
					aria-controls={flyoutId}
					rootClassName="c-flowplayer-control-button"
					// Highlighted means "sound is on" - the icon carries muted/unmuted on its own axis.
					className={clsx('c-flowplayer-control-button--slot', {
						'c-flowplayer-control-button--active': isOpen || !isMutedVisually,
					})}
				/>
			</DropdownButton>
			<DropdownContent>
				<div className="c-flowplayer-volume-flyout__content">
					{/* Icon first, not after the bars - otherwise it reads as an indicator, not the
					button you'd reach for to mute. */}
					<Button
						ref={muteButtonRef}
						icon={isMutedVisually ? <MuteIcon /> : <VolumeIcon />}
						ariaLabel={isMutedVisually ? labels.unmute : labels.mute}
						title={isMutedVisually ? labels.unmute : labels.mute}
						onClick={onToggleMute}
						rootClassName="c-flowplayer-control-button"
					/>
					{/* Native hides its volume bar outright while muted, which would leave this flyout
					half empty - show it emptied instead. */}
					<VolumeBars
						value={muted ? 0 : volume}
						steps={steps}
						onChange={onVolumeChange}
						ariaLabel={labels.volume}
					/>
				</div>
			</DropdownContent>
		</Dropdown>
	);
};
