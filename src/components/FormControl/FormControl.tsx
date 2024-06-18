import clsx from 'clsx';
import React, { FC } from 'react';

import { bemCls, getVariantClasses } from '../../utils';

import { FormControlProps } from './FormControl.types';

const FormControl: FC<FormControlProps> = ({
	children,
	className,
	disabled,
	errors,
	id,
	label,
	suffix,
	rootClassName: root = 'c-form-control',
	variants,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants), {
		[`${bem(undefined, 'disabled')}`]: disabled,
	});

	return (
		<>
			<div className={rootCls}>
				{label && (
					<label htmlFor={id} className={bem('label')}>
						{label}
						{suffix ? <> {suffix}</> : null}
					</label>
				)}

				<div className={bem('input')}>{children}</div>

				{!!errors?.[0] && (
					<ul className={bem('errors')}>
						{errors.map((error, i) => (
							<li key={i}>{error}</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
};

export default FormControl;
