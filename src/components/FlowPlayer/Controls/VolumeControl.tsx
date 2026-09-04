import clsx from 'clsx';
import type { FC } from 'react';
import { Button } from '../../Button';
import Dropdown from '../../Dropdown/Dropdown';
import { DropdownButton, DropdownContent } from '../../Dropdown/Dropdown.slots';
import type { FlowPlayerControlsLabels } from '../FlowPlayer.types';
import { MuteHighlightedIcon, MuteIcon, VolumeHighlightedIcon, VolumeIcon } from './Controls.icons';
import { VolumeBars } from './VolumeBars';

export interface VolumeControlProps {
	id: string;
	volume: number;
	muted: boolean;
	steps?: number;
	onVolumeChange: (value: number) => void;
	onToggleMute: () => void;
	accentColor: string;
	flyoutBackground: string;
	flyoutForegroundColor: string;
	labels: Required<FlowPlayerControlsLabels>;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const VolumeControl: FC<VolumeControlProps> = ({
	id,
	volume,
	muted,
	steps,
	onVolumeChange,
	onToggleMute,
	accentColor,
	flyoutBackground,
	flyoutForegroundColor,
	labels,
	isOpen,
	onOpen,
	onClose,
}) => {
	const isMutedVisually = muted || volume === 0;

	return (
		<Dropdown
			id={`${id}__volume`}
			isOpen={isOpen}
			onOpen={onOpen}
			onClose={onClose}
			placement="top-start"
			menuWidth="fit-content"
			flyoutClassName="c-flowplayer-volume-flyout"
			shiftPadding={8}
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
					rootClassName="c-flowplayer-control-button"
					className={clsx('c-flowplayer-control-button--slot', {
						'c-flowplayer-control-button--active': isOpen || isMutedVisually,
					})}
				/>
			</DropdownButton>
			<DropdownContent>
				<div
					className="c-flowplayer-volume-flyout__content"
					style={{ backgroundColor: flyoutBackground, color: flyoutForegroundColor }}
				>
					{/* Icon first, not after the bars - otherwise it reads as an indicator, not the
					button you'd reach for to mute. */}
					<Button
						icon={isMutedVisually ? <MuteIcon /> : <VolumeIcon />}
						ariaLabel={isMutedVisually ? labels.unmute : labels.mute}
						title={isMutedVisually ? labels.unmute : labels.mute}
						onClick={onToggleMute}
						rootClassName="c-flowplayer-control-button"
						className="c-flowplayer-control-button--slot"
						style={{ color: flyoutForegroundColor }}
					/>
					<VolumeBars
						value={muted ? 0 : volume}
						steps={steps}
						onChange={onVolumeChange}
						accentColor={accentColor}
						unfilledColor={flyoutForegroundColor}
						ariaLabel={labels.volume}
					/>
				</div>
			</DropdownContent>
		</Dropdown>
	);
};
