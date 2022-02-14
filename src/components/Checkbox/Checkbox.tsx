import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { bemCls, getVariantClasses } from '../../utils';

import { CheckboxProps } from './Checkbox.types';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	(
		{
			checked = false,
			checkIcon,
			className,
			disabled = false,
			label,
			rootClassName: root = 'c-checkbox',
			value,
			variants,
			onChange = () => null,
			...checkboxProps
		},
		ref
	) => {
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
					ref={ref}
					type="checkbox"
					value={value}
					onChange={onChange}
				/>
				<span className={bem('check-icon')}>{checkIcon}</span>
				{label && <span className={bem('label')}>{label}</span>}
			</label>
		);
	}
);

export default Checkbox;
