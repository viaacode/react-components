import clsx from 'clsx';
import type { FC } from 'react';
import { Button } from '../../Button';
import { ControlFlyout, type FlyoutOptionData } from './ControlFlyout';
import { SubtitlesHighlightedIcon, SubtitlesIcon } from './Controls.icons';

export type SubtitleTrackOption = FlyoutOptionData;

export interface SubtitlesControlProps {
	id: string;
	tracks: SubtitleTrackOption[];
	activeTrackKey: string | null;
	onSelect: (trackKey: string | null) => void;
	offLabel: string;
	triggerLabel: string;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const OFF_KEY = '__off';

/** Mirrors Flowplayer's own native "Subtitles" menu: track list + an off option, not a plain toggle. */
export const SubtitlesControl: FC<SubtitlesControlProps> = ({
	id,
	tracks,
	activeTrackKey,
	onSelect,
	offLabel,
	triggerLabel,
	isOpen,
	onOpen,
	onClose,
}) => {
	const isOn = activeTrackKey !== null;
	const isHighlighted = isOn || isOpen;

	const options: FlyoutOptionData[] = [{ key: OFF_KEY, label: offLabel }, ...tracks];

	return (
		<ControlFlyout
			id={`${id}__subtitles`}
			flyoutClassName="c-flowplayer-subtitles-flyout"
			isOpen={isOpen}
			onOpen={onOpen}
			onClose={onClose}
			activeKey={activeTrackKey ?? OFF_KEY}
			onSelect={(key) => onSelect(key === OFF_KEY ? null : (key as string))}
			trigger={
				<Button
					icon={isHighlighted ? <SubtitlesHighlightedIcon /> : <SubtitlesIcon />}
					ariaLabel={triggerLabel}
					title={triggerLabel}
					rootClassName="c-flowplayer-control-button"
					className={clsx('c-flowplayer-control-button--slot', {
						'c-flowplayer-control-button--active': isHighlighted,
					})}
				/>
			}
			options={options}
		/>
	);
};
