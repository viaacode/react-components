import autosize from 'autosize';
import clsx from 'clsx';
import React, { FunctionComponent, useEffect } from 'react';

import { useCallbackRef } from '../../hooks/use-callback-ref';
import { bemCls } from '../../utils/bem-class';
import { getVariantClasses } from '../../utils/variant-classes';

import { TextAreaProps } from './TextArea.types';

const TextArea: FunctionComponent<TextAreaProps> = ({
	autoHeight = false,
	className,
	disabled = false,
	id,
	name,
	placeholder,
	rootClassName: root = 'c-input',
	rows,
	value = '',
	variants,
	onChange = () => null,
	onBlur = () => null,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, bem('', 'textarea'), getVariantClasses(root, variants));

	const [textArea, textAreaRef] = useCallbackRef<HTMLTextAreaElement>();

	useEffect(() => {
		if (autoHeight && textArea) {
			autosize(textArea);
		}
	}, [autoHeight, textArea, textAreaRef]);

	return (
		<div className={rootCls}>
			<textarea
				ref={textAreaRef}
				className={bem('field')}
				id={id}
				name={name}
				rows={rows}
				disabled={disabled}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</div>
	);
};

export default TextArea;
