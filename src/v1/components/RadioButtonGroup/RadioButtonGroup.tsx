import classnames from 'classnames';
import React, { FunctionComponent, useState } from 'react';

import { generateRandomId } from '../../helpers/uuid';
import { DefaultProps } from '../../types';
import { RadioButton } from '../RadioButton/RadioButton';

export interface RadioOption {
	label: string;
	value: string;
	disabled?: boolean;
}

export interface RadioButtonGroupPropsSchema extends DefaultProps {
	options: RadioOption[];
	value: string | null;
	inline?: boolean;
	onChange: (value: string) => void;
}

export const RadioButtonGroup: FunctionComponent<RadioButtonGroupPropsSchema> = ({
	options,
	value,
	inline,
	onChange,
	className,
}: RadioButtonGroupPropsSchema) => {
	const [generatedName] = useState<string>(`radio-${generateRandomId()}`);

	return (
		<div
			className={classnames(className, 'c-radio-group', { 'c-radio-group--inline': inline })}
		>
			{options.map((option: RadioOption) => {
				return (
					<RadioButton
						label={option.label}
						name={generatedName}
						value={option.value}
						onChange={onChange}
						checked={option.value === value}
						disabled={option.disabled}
						key={`${generatedName}-${option.value}`}
					/>
				);
			})}
		</div>
	);
};
