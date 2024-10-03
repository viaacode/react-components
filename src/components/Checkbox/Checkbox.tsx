import clsx from 'clsx';
import React, { FC } from 'react';

import { bemCls, getVariantClasses } from '../../utils';
import { Spinner } from '../Spinner';

import { CheckboxProps } from './Checkbox.types';

export const Checkbox: FC<CheckboxProps> = ({
	checked = false,
	showSpinner = false,
	checkIcon,
	className,
	disabled = false,
	label,
	rootClassName: root = 'c-checkbox',
	value,
	variants,
	onChange = () => null,
	...checkboxProps
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants), {
		[bem('', 'checked')]: checked,
		[bem('', 'disabled')]: disabled,
	});

	return (
		<label className={rootCls}>
			<input
				{...checkboxProps}
				checked={checked}
				className={bem('input')}
				disabled={disabled}
				type="checkbox"
				value={value}
				onChange={onChange}
			/>
			{showSpinner && <Spinner />}
			{!showSpinner && <span className={bem('check-icon')}>{checkIcon}</span>}
			{label && <span className={bem('label')}>{label}</span>}
		</label>
	);
};
