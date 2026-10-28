import clsx from 'clsx';
import { type ChangeEvent, type FC, forwardRef, useLayoutEffect, useRef } from 'react';

import { useEnterKeyClick } from '../../hooks';
import { bemCls, getVariantClasses, mergeRefs } from '../../utils';
import { Spinner } from '../Spinner';

import type { CheckboxProps } from './Checkbox.types';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	(
		{
			checked = false,
			showSpinner = false,
			checkIcon,
			indeterminate = false,
			indeterminateIcon,
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
		const inputRef = useRef<HTMLInputElement>(null);
		const bem = bemCls.bind(root);
		const rootCls = clsx(className, root, getVariantClasses(root, variants), {
			[bem('', 'checked')]: checked && !indeterminate,
			[bem('', 'indeterminate')]: indeterminate,
			[bem('', 'disabled')]: disabled,
		});

		// Indeterminate can only be set through javascript, not as an html attribute
		// A layout effect sets it before the browser paints, so the checkbox never shows the wrong state
		useLayoutEffect(() => {
			if (inputRef.current) {
				inputRef.current.indeterminate = indeterminate;
			}
		});

		const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
			// Clicking the input clears the indeterminate flag, restore it from the props,
			// otherwise screen readers announce a different state than the one shown when the parent does not re-render
			evt.currentTarget.indeterminate = indeterminate;
			onChange(evt);
		};

		return (
			<label className={rootCls}>
				<input
					{...checkboxProps}
					checked={checked}
					className={bem('input')}
					disabled={disabled}
					ref={mergeRefs([ref, inputRef])}
					type="checkbox"
					value={value}
					onChange={handleChange}
					onKeyDown={useEnterKeyClick({ disabled })}
				/>
				{showSpinner && <Spinner />}
				{!showSpinner && (
					<span className={bem('check-icon')}>
						{indeterminate ? (indeterminateIcon ?? checkIcon) : checkIcon}
					</span>
				)}
				{label && <span className={bem('label')}>{label}</span>}
			</label>
		);
	}
);

export default Checkbox as FC<CheckboxProps>;
