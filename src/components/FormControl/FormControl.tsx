import clsx from 'clsx';
import type { FC } from 'react';

import { bemCls, getVariantClasses } from '../../utils/index.js';

import type { FormControlProps } from './FormControl.types.js';

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
						// biome-ignore lint/suspicious/noArrayIndexKey: TODO fix
						<li key={i}>{error}</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default FormControl;
