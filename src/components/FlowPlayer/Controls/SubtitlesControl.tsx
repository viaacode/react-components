import clsx from 'clsx';
import type { FC } from 'react';
import { Button } from '../../Button';
import Dropdown from '../../Dropdown/Dropdown';
import { DropdownButton, DropdownContent } from '../../Dropdown/Dropdown.slots';
import { CheckIcon, SubtitlesHighlightedIcon, SubtitlesIcon } from './Controls.icons';

export interface SubtitleTrackOption {
	key: string;
	label: string;
}

export interface SubtitlesControlProps {
	id: string;
	tracks: SubtitleTrackOption[];
	activeTrackKey: string | null;
	onSelect: (trackKey: string | null) => void;
	offLabel: string;
	triggerLabel: string;
	flyoutForegroundColor: string;
	flyoutBackground: string;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

/**
 * Mirrors Flowplayer's own native "Subtitles" menu (track list + an off option) - not just a
 * plain on/off toggle, so every subtitle track the consumer configured stays selectable.
 */
export const SubtitlesControl: FC<SubtitlesControlProps> = ({
	id,
	tracks,
	activeTrackKey,
	onSelect,
	offLabel,
	triggerLabel,
	flyoutForegroundColor,
	flyoutBackground,
	isOpen,
	onOpen,
	onClose,
}) => {
	const isOn = activeTrackKey !== null;
	const isHighlighted = isOn || isOpen;

	return (
		<Dropdown
			id={`${id}__subtitles`}
			isOpen={isOpen}
			onOpen={onOpen}
			onClose={onClose}
			placement="top-end"
			menuWidth="fit-content"
			flyoutClassName="c-flowplayer-subtitles-flyout"
		>
			<DropdownButton>
				<Button
					icon={isHighlighted ? <SubtitlesHighlightedIcon /> : <SubtitlesIcon />}
					ariaLabel={triggerLabel}
					title={triggerLabel}
					rootClassName="c-flowplayer-control-button"
					className={clsx('c-flowplayer-control-button--slot', {
						'c-flowplayer-control-button--active': isHighlighted,
					})}
				/>
			</DropdownButton>
			<DropdownContent>
				<ul
					className="c-flowplayer-subtitles-flyout__list"
					style={{ backgroundColor: flyoutBackground, color: flyoutForegroundColor }}
				>
					<li>
						<button
							type="button"
							className="c-flowplayer-subtitles-flyout__option"
							aria-pressed={!isOn}
							onClick={() => onSelect(null)}
						>
							{offLabel}
						</button>
					</li>
					{tracks.length > 0 && <li className="c-flowplayer-subtitles-flyout__divider" aria-hidden="true" />}
					{tracks.map((track) => {
						const isActive = activeTrackKey === track.key;
						return (
							<li key={track.key}>
								<button
									type="button"
									className={clsx('c-flowplayer-subtitles-flyout__option', {
										'c-flowplayer-subtitles-flyout__option--active': isActive,
									})}
									aria-pressed={isActive}
									onClick={() => onSelect(track.key)}
								>
									{isActive && <CheckIcon />}
									{track.label}
								</button>
							</li>
						);
					})}
				</ul>
			</DropdownContent>
		</Dropdown>
	);
};
