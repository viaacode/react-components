import classnames from 'classnames';
import React, { ChangeEvent, FunctionComponent, KeyboardEvent } from 'react';

import { DefaultProps } from '../../types';
import { Icon } from '../Icon/Icon';
import { IconNameSchema } from '../Icon/Icon.types';

type InputType = 'password' | 'text' | 'email' | 'search' | 'number' | 'tel' | 'url';

export interface TextInputPropsSchema extends DefaultProps {
	id?: string;
	disabled?: boolean;
	placeholder?: string;
	value?: string;
	icon?: IconNameSchema;
	type?: InputType;
	ariaLabel?: string;
	onChange?: (value: string) => void;
	onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
	onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const TextInput: FunctionComponent<TextInputPropsSchema> = ({
	className,
	id,
	disabled = false,
	placeholder,
	value = '',
	icon,
	type = 'text',
	ariaLabel = '',
	onChange = () => null,
	onBlur = () => null,
	onKeyUp = () => null,
}) => {
	function onValueChange(event: ChangeEvent<HTMLInputElement>) {
		onChange(event.target.value);
	}

	const classes = classnames(className, icon ? 'c-input-with-icon' : 'c-input');

	return icon ? (
		<div className={classes}>
			<input
				className="c-input"
				type={type}
				id={id}
				value={value}
				disabled={disabled}
				placeholder={placeholder}
				{...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
				onChange={onValueChange}
				onBlur={onBlur}
				onKeyUp={onKeyUp}
			/>
			<Icon name={icon} />
		</div>
	) : (
		<input
			className={classes}
			type={type}
			id={id}
			value={value}
			disabled={disabled}
			placeholder={placeholder}
			{...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
			onChange={onValueChange}
			onBlur={onBlur}
			onKeyUp={onKeyUp}
		/>
	);
};
