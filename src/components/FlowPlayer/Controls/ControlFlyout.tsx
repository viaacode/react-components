import type { FC, ReactNode } from 'react';
import Dropdown from '../../Dropdown/Dropdown';
import { DropdownButton, DropdownContent } from '../../Dropdown/Dropdown.slots';
import { CheckIcon } from './Controls.icons';

export interface FlyoutOptionData {
	key: string | number;
	label: ReactNode;
	/** Raw HTML, rendered below the label/icon row. */
	subLabel?: string;
	icon?: ReactNode;
}

export interface ControlFlyoutProps {
	id: string;
	/** BEM root for this flyout, e.g. "c-flowplayer-speed-flyout" - the list/option classes are derived from it. */
	flyoutClassName: string;
	trigger: ReactNode;
	options: FlyoutOptionData[];
	activeKey: string | number;
	onSelect: (key: string | number) => void;
	flyoutBackground: string;
	flyoutForegroundColor: string;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

/** Shared Dropdown wiring + option list for the volume/subtitles/speed flyouts - one component so speed and subtitles can't drift apart in structure. */
export const ControlFlyout: FC<ControlFlyoutProps> = ({
	id,
	flyoutClassName,
	trigger,
	options,
	activeKey,
	onSelect,
	flyoutBackground,
	flyoutForegroundColor,
	isOpen,
	onOpen,
	onClose,
}) => {
	const optionClassName = `${flyoutClassName}__option`;

	return (
		<Dropdown
			id={id}
			isOpen={isOpen}
			onOpen={onOpen}
			onClose={onClose}
			placement="top-end"
			menuWidth="fit-content"
			flyoutClassName={flyoutClassName}
			shiftPadding={8}
			maxHeightPadding={8}
		>
			<DropdownButton>{trigger}</DropdownButton>
			<DropdownContent>
				<ul
					className={`${flyoutClassName}__list`}
					style={{ backgroundColor: flyoutBackground, color: flyoutForegroundColor }}
				>
					{options.map((option) => {
						const isActive = option.key === activeKey;
						return (
							<li key={option.key} className={`${optionClassName}-item`}>
								<button
									type="button"
									className={optionClassName}
									aria-pressed={isActive}
									onClick={() => onSelect(option.key)}
								>
									<span className={`${optionClassName}-row`}>
										<span className={`${optionClassName}-check`}>
											{isActive && <CheckIcon />}
										</span>
										<span className={`${optionClassName}-label`}>{option.label}</span>
										{option.icon && (
											<span className={`${optionClassName}-icon`}>{option.icon}</span>
										)}
									</span>
									{option.subLabel && (
										<span
											className={`${optionClassName}-sublabel`}
											// biome-ignore lint/security/noDangerouslySetInnerHtml: subLabel is developer/CMS-supplied markup, not user input
											dangerouslySetInnerHTML={{ __html: option.subLabel }}
										/>
									)}
								</button>
							</li>
						);
					})}
				</ul>
			</DropdownContent>
		</Dropdown>
	);
};
