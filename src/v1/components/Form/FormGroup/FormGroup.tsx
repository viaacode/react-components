import classnames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import { DefaultProps } from '../../../types';

import './FormGroup.scss';

export interface FormGroupPropsSchema extends DefaultProps {
	label?: string;
	labelFor?: string;
	required?: boolean;
	error?: string | string[];
	inlineMode?: 'grow' | 'shrink';
	children: ReactNode;
}

export const FormGroup: FunctionComponent<FormGroupPropsSchema> = ({
	className,
	label,
	labelFor,
	required = false,
	error,
	inlineMode,
	children,
}) => {
	const errorArray = typeof error === 'string' ? [error] : error;

	return (
		<div
			className={classnames(className, 'o-form-group', {
				'o-form-group--error': error,
				[`o-form-group--inline-${inlineMode}`]: inlineMode,
			})}
		>
			{label && (
				<label className="o-form-group__label" htmlFor={labelFor}>
					{label}
					{required ? (
						<abbr className="required" title="Verplicht veld">
							*
						</abbr>
					) : null}
				</label>
			)}
			<div className="o-form-group__controls">
				{children}
				{!!errorArray &&
					!!errorArray.length &&
					errorArray.map((err: string, index: number) => (
						<div
							key={`${err}-${index}`}
							className="c-form-help-text c-form-help-text--error"
						>
							{err}
						</div>
					))}
			</div>
		</div>
	);
};
