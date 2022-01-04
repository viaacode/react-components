import clsx from 'clsx';
import React, { FC } from 'react';

import { bemCls, getVariantClasses } from '../../utils';

import { CheckboxProps } from './Checkbox.types';

const Checkbox: FC<CheckboxProps> = ({
	className,
	label,
	id,
	disabled = false,
	checked = false,
	checkIcon,
	rootClassName: root = 'c-checkbox',
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
				type="checkbox"
				id={id}
				checked={checked}
				disabled={disabled}
				onChange={onChange}
			/>
			<span className={bem('check-icon')}>{checkIcon}</span>
			<span className={bem('label')}>{label}</span>
		</label>
	);
};

export default Checkbox;
