import clsx from 'clsx';
import React, { FC, forwardRef, ReactNode, useMemo, useState } from 'react';

import { bemCls, getVariantClasses } from '../../utils';
import { TextInputDefaults } from '../TextInput/TextInput';

import { ContentInputProps } from './ContentInput.types';

const ContentInput: FC<ContentInputProps> = forwardRef<HTMLInputElement, ContentInputProps>(
	(
		{
			align = 'right',
			className,
			disabled = TextInputDefaults.disabled,
			iconEnd = TextInputDefaults.iconEnd,
			iconStart = TextInputDefaults.iconStart,
			nodeCancel = 'x',
			nodeSubmit = '✓',
			onCancel = () => null,
			onChange = TextInputDefaults.onChange,
			onConfirm = () => null,
			rootClassName: root = 'c-content-input',
			type = TextInputDefaults.type,
			value = TextInputDefaults.value,
			variants,
			...inputProps
		},
		ref
	) => {
		const [editable, setEditable] = useState(false);
		const bem = bemCls.bind(root);
		const rootCls = clsx(className, root, getVariantClasses(root, variants), {
			[bem('', 'disabled')]: disabled,
			[bem('', 'icon-start')]: iconStart,
			[bem('', 'icon-end')]: iconEnd,
		});

		/**
		 * Events
		 */

		const onOpenHandler = () => !disabled && setEditable(true);
		const onCloseHandler = () => setEditable(false);

		const onConfirmHandler = useMemo(
			() => (e: { stopPropagation: () => void }) => {
				e.stopPropagation();

				onConfirm(value);
				onCloseHandler();
			},
			[onConfirm, value]
		);

		const onCancelHandler = useMemo(
			() => (e: { stopPropagation: () => void }) => {
				e.stopPropagation();

				onCancel();
				onCloseHandler();
			},
			[onCancel]
		);

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

		const renderButtons = () => (
			<>
				<div
					role="button"
					tabIndex={0}
					className={bem('submit')}
					onClick={onConfirmHandler}
					onKeyUp={onConfirmHandler}
				>
					{nodeSubmit}
				</div>

				<div
					role="button"
					tabIndex={0}
					className={bem('cancel')}
					onClick={onCancelHandler}
					onKeyUp={onCancelHandler}
				>
					{nodeCancel}
				</div>
			</>
		);

		return (
			<div
				className={rootCls}
				role="button"
				tabIndex={0}
				onClick={onOpenHandler}
				onKeyUp={onOpenHandler}
			>
				{editable && align === 'left' && renderButtons()}
				{!editable && iconStart && renderIcon(iconStart, 'start')}

				<input
					{...inputProps}
					className={bem('field')}
					disabled={disabled}
					ref={ref}
					type={type}
					value={value}
					onChange={onChange}
				/>

				{editable && align === 'right' && renderButtons()}
				{!editable && iconEnd && renderIcon(iconEnd, 'end')}
			</div>
		);
	}
);

export default ContentInput;
