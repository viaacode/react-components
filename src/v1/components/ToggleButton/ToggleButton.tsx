import React, { FunctionComponent, useEffect, useState } from 'react';

import { DefaultProps } from '../../types';
import { Button } from '../Button/Button';
import { ButtonTypeSchema } from '../Button/Button.types';
import { IconNameSchema } from '../Icon/Icon.types';

export interface ToggleButtonPropsSchema extends DefaultProps {
	icon: 'heart' | 'bookmark';
	active: boolean;
	ariaLabel: string;
	title?: string;
	type?: ButtonTypeSchema;
	onClick?: (active: boolean) => void;
}

export const ToggleButton: FunctionComponent<ToggleButtonPropsSchema> = ({
	className,
	icon,
	active,
	ariaLabel,
	title,
	type = 'borderless',
	onClick = () => null,
}) => {
	const [filled, setFilled] = useState(active);

	useEffect(() => {
		// sync up `active`-prop with filled-state
		setFilled(active);
	}, [active]);

	function onButtonClick() {
		setFilled(!filled);
		if (onClick) {
			onClick(!filled);
		}
	}

	function getIcon(): IconNameSchema {
		if (filled) {
			return `${icon}-filled` as IconNameSchema;
		}

		return icon;
	}

	return (
		<Button
			className={className}
			icon={getIcon()}
			type={type}
			active={filled}
			onClick={onButtonClick}
			ariaLabel={`${ariaLabel} (currently ${active ? 'active' : 'not active'})`}
			title={title}
		/>
	);
};
