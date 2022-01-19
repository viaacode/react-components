import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

import { bemCls, getVariantClasses } from '../../utils';

import { TextInputProps } from './TextInput.types';

const TextInput: FC<TextInputProps> = ({
	ariaLabel,
	className,
	disabled = false,
	iconEnd = null,
	iconStart = null,
	id,
	placeholder,
	rootClassName: root = 'c-input',
	type = 'text',
	value = '',
	variants,
	onBlur = () => null,
	onChange = () => null,
	onKeyUp = () => null,
	onClick,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants), {
		[bem('', 'disabled')]: disabled,
		[bem('', 'icon-start')]: iconStart,
		[bem('', 'icon-end')]: iconEnd,
	});

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
			role={onClick ? 'button' : undefined}
			tabIndex={onClick ? 0 : -1}
			onClick={onClick}
			onKeyUp={(e) => e.key === 'Enter' && onClick && onClick(e)}
		>
			{iconStart && renderIcon(iconStart, 'start')}
			<input
				{...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
				className={bem('field')}
				type={type}
				id={id}
				value={value}
				disabled={disabled}
				placeholder={placeholder}
				onBlur={onBlur}
				onChange={onChange}
				onKeyUp={onKeyUp}
			/>
			{iconEnd && renderIcon(iconEnd, 'end')}
		</div>
	);
};

export default TextInput;
