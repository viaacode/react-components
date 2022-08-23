import clsx from 'clsx';
import React, {
	FC,
	forwardRef,
	KeyboardEvent,
	MouseEvent,
	ReactNode,
	useCallback,
	useState,
} from 'react';

import { bemCls, getVariantClasses, keysEnter, keysEscape, keysSpacebar, onKey } from '../../utils';
import { TextInputDefaults } from '../TextInput/TextInput';

import { ContentInputProps, StopPropagationObject } from './ContentInput.types';

const ContentInput: FC<ContentInputProps> = forwardRef<HTMLInputElement, ContentInputProps>(
	(
		{
			align = 'right',
			className,
			disabled = TextInputDefaults.disabled,
			iconEnd = () => TextInputDefaults.iconEnd,
			iconStart = () => TextInputDefaults.iconStart,
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
		const [instance, setInstance] = useState<HTMLInputElement | null>(null);

		const bem = bemCls.bind(root);
		const rootCls = clsx(className, root, getVariantClasses(root, variants), {
			[bem('', 'disabled')]: disabled,
			[bem('', 'icon-start')]: iconStart,
			[bem('', 'icon-end')]: iconEnd,
		});

		/**
		 * Events
		 */

		const onOpenHandler = useCallback(
			(e: StopPropagationObject) => {
				if (!disabled && !editable) {
					e.stopPropagation();

					setEditable(true);
					onOpen();
					setTimeout(() => instance?.focus());
				}
			},
			[onOpen, disabled, editable, instance]
		);

		const onCloseHandler = useCallback(
			(e: StopPropagationObject) => {
				if (editable) {
					e.stopPropagation();

					setEditable(false);
					onClose();
				}
			},
			[onClose, editable]
		);

		const onConfirmHandler = useCallback(
			(e: StopPropagationObject) => {
				if (!disabled && editable) {
					e.stopPropagation();

					onConfirm(value);
					onCloseHandler(e);
				}
			},
			[onConfirm, onCloseHandler, value, disabled, editable]
		);

		const onCancelHandler = useCallback(
			(e: StopPropagationObject) => {
				e.stopPropagation();

				onCancel();
				onCloseHandler(e);
			},
			[onCancel, onCloseHandler]
		);

		/**
		 * Render
		 */

		const isSingleElement = (node: ReactNode) => {
			const el = node as JSX.Element;
			return !(el && el.props && el.props.children && el.props.children.length > 1);
		};

		const makeInteractionObject = (func: (e: MouseEvent | KeyboardEvent) => void) => {
			return {
				onClick: func,
				onKeyDown: (e: KeyboardEvent) =>
					onKey(e, [...keysEnter, ...keysSpacebar], () => func(e)),
				role: 'button',
				tabIndex: 0,
			};
		};

		const renderIcon = (iconNode: ReactNode, side?: 'start' | 'end') =>
			iconNode && (
				<span
					className={clsx(bem('icon'), {
						[bem('icon', side)]: side,
						[bem('', 'interactable')]: isSingleElement(iconNode),
					})}
					{...(isSingleElement(iconNode)
						? {
								...makeInteractionObject(onOpenHandler),
								tabIndex: disabled || editable ? -1 : 0, // Disable start & end when editable or disabled
						  }
						: {})}
				>
					{iconNode}
				</span>
			);

		const renderButtons = () => (
			<>
				{nodeSubmit && (
					<div
						className={clsx(bem('submit'), {
							[bem('', 'interactable')]: isSingleElement(nodeSubmit),
						})}
						{...(isSingleElement(nodeSubmit)
							? makeInteractionObject(onConfirmHandler)
							: {})}
						tabIndex={disabled || !editable ? -1 : 0} // Disable submit & cancel when not editable or disabled
					>
						{nodeSubmit}
					</div>
				)}

				{nodeCancel && (
					<div
						className={clsx(bem('cancel'), {
							[bem('', 'interactable')]: isSingleElement(nodeCancel),
						})}
						{...(isSingleElement(nodeCancel)
							? makeInteractionObject(onCancelHandler)
							: {})}
						tabIndex={disabled || !editable ? -1 : 0} // Disable submit & cancel when not editable or disabled
					>
						{nodeCancel}
					</div>
				)}
			</>
		);

		return (
			<div
				className={clsx(rootCls, {
					[bem('', 'open')]: editable,
					[bem('', 'closed')]: !editable,
				})}
			>
				{renderIcon(iconStart(onOpenHandler), 'start')}
				{editable && align === 'left' && renderButtons()}

				<span
					role="button"
					tabIndex={editable ? -1 : 0}
					onClick={onOpenHandler}
					onKeyDown={(e) =>
						!editable &&
						onKey(e, [...keysEnter, ...keysSpacebar], () => onOpenHandler(e))
					}
					className={bem('value')}
				>
					{value}
				</span>

				<input
					{...inputProps}
					className={bem('field')}
					disabled={disabled}
					onChange={onChange}
					onClick={onOpenHandler}
					onKeyDown={(e) => {
						onKey(e, keysEnter, () => onConfirmHandler(e));
						onKey(e, keysEscape, () => onCancelHandler(e));
					}}
					ref={(element) => {
						setInstance(element);
						return ref;
					}}
					type={type}
					value={value}
					tabIndex={disabled || !editable ? -1 : 0}
				/>

				{editable && align === 'right' && renderButtons()}
				{renderIcon(iconEnd(onOpenHandler), 'end')}
			</div>
		);
	}
);

export default ContentInput;
