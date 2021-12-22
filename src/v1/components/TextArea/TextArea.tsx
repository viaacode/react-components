import autosize from 'autosize';
import classnames from 'classnames';
import React, { ChangeEvent, FunctionComponent, useEffect } from 'react';

import { useCallbackRef } from '../../hooks/useCallbackRef';
import { DefaultProps } from '../../types';

export interface TextAreaPropsSchema extends DefaultProps {
	id?: string;
	name?: string;
	rows?: number;
	disabled?: boolean;
	placeholder?: string;
	value?: string;
	height?: 'auto' | 'small' | 'medium' | 'large';
	width?: 'xsmall' | 'small' | 'medium' | 'large';
	onChange?: (value: string) => void;
	onBlur?: () => void;
}

export const TextArea: FunctionComponent<TextAreaPropsSchema> = ({
	className,
	id,
	name,
	rows,
	disabled = false,
	placeholder,
	value = '',
	height,
	width,
	onChange = () => null,
	onBlur = () => null,
}) => {
	const [textArea, textAreaRef] = useCallbackRef<HTMLTextAreaElement>();

	useEffect(() => {
		if (height === 'auto' && textArea) {
			autosize(textArea);
		}
	}, [height, textArea, textAreaRef]);

	function onValueChange(event: ChangeEvent<HTMLTextAreaElement>) {
		onChange(event.target.value);
	}

	return (
		<textarea
			className={classnames(className, 'c-input', {
				[`c-input--h-${height}`]: height && height !== 'auto',
				[`c-input--w-${width}`]: width,
			})}
			id={id}
			name={name}
			rows={rows}
			disabled={disabled}
			placeholder={placeholder}
			value={value}
			onChange={onValueChange}
			onBlur={onBlur}
			ref={textAreaRef}
		/>
	);
};
