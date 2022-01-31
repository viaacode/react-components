import clsx from 'clsx';
import React, { FC, forwardRef, ReactNode } from 'react';

import { bemCls, getVariantClasses } from '../../utils';

import { TextInputProps } from './TextInput.types';

const TextInput: FC<TextInputProps> = forwardRef<HTMLInputElement, TextInputProps>(
	(
		{
			className,
			disabled = false,
			iconEnd = null,
			iconStart = null,
			rootClassName: root = 'c-input',
			type = 'text',
			variants,
			value = '',
			onChange = () => null,
			onContainerClick,
			onContainerKeyUp = () => null,
			...inputProps
		},
		ref
	) => {
		const bem = bemCls.bind(root);
		const rootCls = clsx(className, root, getVariantClasses(root, variants), {
			[bem('', 'disabled')]: disabled,
			[bem('', 'icon-start')]: iconStart,
			[bem('', 'icon-end')]: iconEnd,
		});

		const hasContainerEvents = !!onContainerClick || !!onContainerKeyUp;

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
			<div
				className={rootCls}
				role={hasContainerEvents ? 'button' : undefined}
				tabIndex={hasContainerEvents ? 0 : undefined}
				onClick={onContainerClick}
				onKeyUp={onContainerKeyUp}
			>
				{iconStart && renderIcon(iconStart, 'start')}
				<input
					{...inputProps}
					className={bem('field')}
					disabled={disabled}
					ref={ref}
					type={type}
					value={value}
					onChange={onChange}
				/>
				{iconEnd && renderIcon(iconEnd, 'end')}
			</div>
		);
	}
);

export default TextInput;
