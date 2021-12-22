import classnames from 'classnames';
import React, { ChangeEvent, FunctionComponent } from 'react';

import { DefaultProps } from '../../types';
import { Button } from '../Button/Button';

import './FileInput.scss';

export interface FileInputProps extends DefaultProps {
	id?: string;
	disabled?: boolean;
	placeholder?: string;
	ariaLabel?: string;
	onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
}

export const FileInput: FunctionComponent<FileInputProps> = ({
	className,
	id,
	disabled,
	placeholder = 'Upload',
	ariaLabel = '',
	onChange = () => null,
}) => {
	return (
		<Button
			className={classnames('c-button--file', className)}
			type="secondary"
			disabled={disabled}
			ariaLabel={ariaLabel || placeholder}
		>
			<div className="c-button__label">{placeholder}</div>
			<input
				type="file"
				id={id}
				disabled={disabled}
				{...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
				onChange={onChange}
			/>
		</Button>
	);
};
