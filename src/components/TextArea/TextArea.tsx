import autosize from 'autosize';
import clsx from 'clsx';
import { forwardRef, useEffect } from 'react';

import { useCallbackRef } from '../../hooks/index';
import { bemCls, getVariantClasses, mergeRefs } from '../../utils/index';

import type { TextAreaProps } from './TextArea.types';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(
		{
			autoHeight = false,
			className,
			disabled = false,
			rootClassName: root = 'c-input',
			value = '',
			variants,
			onChange = () => null,
			...textAreaProps
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
					{...textAreaProps}
					ref={mergeRefs([ref, textAreaRef])}
					className={bem('field')}
					disabled={disabled}
					value={value}
					onChange={onChange}
				/>
			</div>
		);
	}
);

export default TextArea;
