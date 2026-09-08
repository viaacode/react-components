import clsx from 'clsx';
import type { FC } from 'react';
import { Button } from '../../Button';
import { ControlFlyout, type FlyoutOptionData } from './ControlFlyout';

export interface SpeedControlProps {
	id: string;
	options: FlyoutOptionData[];
	currentRate: number;
	onChange: (rate: number) => void;
	label: string;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const SpeedControl: FC<SpeedControlProps> = ({
	id,
	options,
	currentRate,
	onChange,
	label,
	isOpen,
	onOpen,
	onClose,
}) => {
	const buttonLabel = `${currentRate}x`;
	const buttonTitle = `${label}: ${buttonLabel}`;

	return (
		<ControlFlyout
			id={`${id}__speed`}
			flyoutClassName="c-flowplayer-speed-flyout"
			isOpen={isOpen}
			onOpen={onOpen}
			onClose={onClose}
			activeKey={currentRate}
			onSelect={(key) => onChange(key as number)}
			trigger={
				<Button
					label={buttonLabel}
					ariaLabel={buttonTitle}
					title={buttonTitle}
					rootClassName="c-flowplayer-control-button"
					className={clsx('c-flowplayer-control-button--slot c-flowplayer-control-button--text', {
						'c-flowplayer-control-button--active': isOpen,
					})}
				/>
			}
			options={options}
		/>
	);
};
