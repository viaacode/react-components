import clsx from 'clsx';
import React, { FC, forwardRef, ReactNode, useCallback, useMemo, useState } from 'react';

import { bemCls, getVariantClasses } from '../../utils';
import { keyUpConfirm } from '../../utils/key-up-confirm';
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
			onOpen = () => null,
			onClose = () => null,
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

		const onOpenHandler = useCallback(() => {
			if (!disabled && !editable) {
				setEditable(true);
				onOpen();
			}
		}, [onOpen, disabled, editable]);

		const onCloseHandler = useCallback(() => {
			if (editable) {
				setEditable(false);
				onClose();
			}
		}, [onClose, editable]);

		const onConfirmHandler = useMemo(
			() => (e: { stopPropagation: () => void }) => {
				e.stopPropagation();

				onConfirm(value);
				onCloseHandler();
			},
			[onConfirm, onCloseHandler, value]
		);

		const onCancelHandler = useMemo(
			() => (e: { stopPropagation: () => void }) => {
				e.stopPropagation();

				onCancel();
				onCloseHandler();
			},
			[onCancel, onCloseHandler]
		);

		/**
		 * Render
		 */

		const renderIcon = (iconNode: ReactNode, side?: 'start' | 'end') => (
			<span
				onClick={onOpenHandler}
				onKeyUp={(e) => keyUpConfirm(e, () => onOpenHandler())}
				role="button"
				tabIndex={0}
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
					className={bem('submit')}
					onClick={onConfirmHandler}
					onKeyUp={(e) => keyUpConfirm(e, () => onConfirmHandler(e))}
					role="button"
					tabIndex={0}
				>
					{nodeSubmit}
				</div>

				<div
					className={bem('cancel')}
					onClick={onCancelHandler}
					onKeyUp={(e) => keyUpConfirm(e, () => onCancelHandler(e))}
					role="button"
					tabIndex={0}
				>
					{nodeCancel}
				</div>
			</>
		);

		return (
			<div className={rootCls}>
				{iconStart && renderIcon(iconStart, 'start')}
				{editable && align === 'left' && renderButtons()}

				<input
					{...inputProps}
					className={bem('field')}
					disabled={disabled}
					onChange={onChange}
					onClick={onOpenHandler}
					ref={ref}
					type={type}
					value={value}
				/>

				{editable && align === 'right' && renderButtons()}
				{iconEnd && renderIcon(iconEnd, 'end')}
			</div>
		);
	}
);

export default ContentInput;
