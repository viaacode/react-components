import autosize from 'autosize';
import clsx from 'clsx';
import { forwardRef, useEffect } from 'react';

import { useCallbackRef } from '../../hooks';
import { bemCls, getVariantClasses, mergeRefs } from '../../utils';

import type { TextAreaProps } from './TextArea.types';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(
		{
			autoHeight = false,
			rows,
			className,
			disabled = false,
			rootClassName: root = 'c-input',
			value = '',
			variants,
			onChange = () => null,
			id,
			name,
			ariaLabel,
			onBlur,
			onClick,
			placeholder,
			maxLength,
		},
		ref
	) => {
		const bem = bemCls.bind(root);
		const rootCls = clsx(className, root, bem('', 'textarea'), getVariantClasses(root, variants));

		const [textArea, textAreaRef] = useCallbackRef<HTMLTextAreaElement>();

		useEffect(() => {
			if (autoHeight && textArea) {
				autosize(textArea);
			}
		}, [autoHeight, textArea]);

		return (
			<div className={rootCls}>
				<textarea
					id={id}
					name={name}
					aria-label={ariaLabel}
					onBlur={onBlur}
					onClick={onClick}
					placeholder={placeholder}
					maxLength={maxLength}
					ref={mergeRefs([ref, textAreaRef])}
					className={bem('field')}
					disabled={disabled}
					value={value}
					onChange={onChange}
					rows={rows}
				/>
			</div>
		);
	}
);

export default TextArea;
