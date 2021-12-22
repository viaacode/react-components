import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import { DefaultProps } from '../../types';

export interface RadioButtonPropsSchema extends DefaultProps {
	label: string;
	name: string;
	value: string;
	id?: string;
	disabled?: boolean;
	checked?: boolean;
	onChange?: (value: string) => void;
}

export const RadioButton: FunctionComponent<RadioButtonPropsSchema> = ({
	label,
	name,
	value,
	id,
	disabled = false,
	checked = false,
	onChange = () => null,
	className,
}) => {
	return (
		<div className={classnames(className, 'c-radio')}>
			<label>
				<input
					type="radio"
					name={name}
					value={value}
					id={id}
					checked={checked}
					disabled={disabled}
					onChange={(evt) => onChange(evt.target.value)}
				/>
				{label}
			</label>
		</div>
	);
};
