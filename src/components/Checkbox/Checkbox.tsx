import clsx from 'clsx';
import React, { type FC, forwardRef } from 'react';

import { bemCls, getVariantClasses } from '../../utils/index.js';
import { Spinner } from '../Spinner/index.js';

import type { CheckboxProps } from './Checkbox.types.js';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	(
		{
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
				{showSpinner && <Spinner />}
				{!showSpinner && <span className={bem('check-icon')}>{checkIcon}</span>}
				{label && <span className={bem('label')}>{label}</span>}
			</label>
		);
	}
);

export default Checkbox as FC<CheckboxProps>;
