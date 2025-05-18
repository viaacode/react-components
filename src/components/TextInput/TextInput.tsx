import clsx from 'clsx';
import React, { FC, forwardRef, ReactNode } from 'react';

import { bemCls, getVariantClasses } from '../../utils';
import { isFunction } from '../../utils/is-function';

import { TextInputProps } from './TextInput.types';

export const TextInputDefaults = {
	disabled: false,
	iconEnd: null,
	iconStart: null,
	rootClassName: 'c-input',
	type: 'text',
	value: '',
	onChange: () => null,
};

export const TextInput: FC<TextInputProps> = forwardRef<HTMLInputElement, TextInputProps>(
	(
		{
			className,
			disabled = TextInputDefaults.disabled,
			iconEnd = TextInputDefaults.iconEnd,
			iconStart = TextInputDefaults.iconStart,
			rootClassName: root = TextInputDefaults.rootClassName,
			type = TextInputDefaults.type,
			variants,
			value = TextInputDefaults.value,
			onChange = TextInputDefaults.onChange,
			onClick,
			onKeyUp,
			...inputProps
		},
		ref
	) => {
		const bem = bemCls.bind(root);
		const rootCls = clsx(className, root, getVariantClasses(root, variants), {
			[bem('', 'disabled')]: disabled,
			[bem('', 'icon-start')]: !!iconStart,
			[bem('', 'icon-end')]: !!iconEnd,
		});

		const hasContainerEvents = !!onClick || !!onKeyUp;

		/**
		 * Render
		 */

		const renderIcon = (iconNode: ReactNode, side?: 'start' | 'end') => (
			<span
				className={clsx(bem('icon'), {
					[bem('icon', side)]: side,
				})}
			>
				{iconNode}
			</span>
		);

		return (
			<div className={rootCls}>
				{iconStart &&
					renderIcon(
						isFunction(iconStart)
							? (iconStart as () => ReactNode)()
							: (iconStart as ReactNode),
						'start'
					)}
				<input
					{...inputProps}
					className={bem('field')}
					disabled={disabled}
					ref={ref}
					type={type}
					value={value}
					onChange={onChange}
					role={hasContainerEvents ? 'button' : undefined}
					tabIndex={hasContainerEvents ? 0 : undefined}
					onClick={onClick}
					onKeyUp={onKeyUp}
				/>
				{iconEnd &&
					renderIcon(
						isFunction(iconEnd)
							? (iconEnd as () => ReactNode)()
							: (iconEnd as ReactNode),
						'end'
					)}
			</div>
		);
	}
);
