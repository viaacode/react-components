import clsx from 'clsx';
import type { FC } from 'react';
import { Button } from '../../Button';
import Dropdown from '../../Dropdown/Dropdown';
import { DropdownButton, DropdownContent } from '../../Dropdown/Dropdown.slots';

export interface SpeedControlProps {
	id: string;
	options: number[];
	labelsForOptions?: string[];
	currentRate: number;
	onChange: (rate: number) => void;
	label: string;
	flyoutBackground: string;
	flyoutForegroundColor: string;
	accentColor: string;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const SpeedControl: FC<SpeedControlProps> = ({
	id,
	options,
	labelsForOptions,
	currentRate,
	onChange,
	label,
	flyoutBackground,
	flyoutForegroundColor,
	accentColor,
	isOpen,
	onOpen,
	onClose,
}) => (
	<Dropdown
		id={`${id}__speed`}
		isOpen={isOpen}
		onOpen={onOpen}
		onClose={onClose}
		placement="top-end"
		menuWidth="fit-content"
		flyoutClassName="c-flowplayer-speed-flyout"
	>
		<DropdownButton>
			<Button
				label={`${currentRate}x`}
				ariaLabel={`${label}: ${currentRate}x`}
				title={label}
				rootClassName="c-flowplayer-control-button"
				className={clsx('c-flowplayer-control-button--slot c-flowplayer-control-button--text', {
					'c-flowplayer-control-button--active': isOpen,
				})}
			/>
		</DropdownButton>
		<DropdownContent>
			<ul
				className="c-flowplayer-speed-flyout__list"
				style={{ backgroundColor: flyoutBackground, color: flyoutForegroundColor }}
			>
				{options.map((option, index) => (
					<li key={option}>
						<button
							type="button"
							className="c-flowplayer-speed-flyout__option"
							aria-pressed={currentRate === option}
							style={currentRate === option ? { color: accentColor } : undefined}
							onClick={() => onChange(option)}
						>
							{labelsForOptions?.[index] ?? `${option}x`}
						</button>
					</li>
				))}
			</ul>
		</DropdownContent>
	</Dropdown>
);
