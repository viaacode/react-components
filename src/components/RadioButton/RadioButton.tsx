import clsx from 'clsx';
import React, { FC } from 'react';

import { bemCls, getVariantClasses } from '../../utils';

import { RadioButtonProps } from './RadioButton.types';

const RadioButton: FC<RadioButtonProps> = ({
	className,
	label,
	id,
	disabled = false,
	checked = false,
	rootClassName: root = 'c-radio-button',
	variants,
	onChange = () => null,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants), {
		[bem('', 'checked')]: checked,
		[bem('', 'disabled')]: disabled,
	});

	return (
		<label className={rootCls}>
			<input
				className={bem('input')}
				type="radio"
				id={id}
				checked={checked}
				disabled={disabled}
				onChange={onChange}
			/>
			<span className={bem('check-icon')} />
			<span className={bem('label')}>{label}</span>
		</label>
	);
};

export default RadioButton;
