import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { bemCls, getVariantClasses } from '../../utils';

import type { RadioButtonProps } from './RadioButton.types';

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
	(
		{
			checked = false,
			className,
			disabled = false,
			label,
			rootClassName: root = 'c-radio-button',
			value,
			variants,
			onChange = () => null,
			...radioButtonProps
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
					{...radioButtonProps}
					checked={checked}
					className={bem('input')}
					disabled={disabled}
					ref={ref}
					type="radio"
					value={value}
					onChange={onChange}
				/>
				<span className={bem('check-icon')} />
				{label && <span className={bem('label')}>{label}</span>}
			</label>
		);
	}
);

export default RadioButton;
