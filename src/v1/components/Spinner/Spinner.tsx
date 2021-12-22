import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import { DefaultProps } from '../../types';

import './Spinner.scss';

export interface SpinnerPropsSchema extends DefaultProps {
	size?: 'large';
	light?: boolean;
}

export const Spinner: FunctionComponent<SpinnerPropsSchema> = ({
	className,
	size,
	light = false,
}) => {
	return (
		<div
			className={classnames(className, 'c-spinner', {
				'c-spinner--large': size === 'large',
				'c-spinner--light': light,
			})}
		>
			<div className="c-spinner__bar" />
			<div className="c-spinner__bar" />
			<div className="c-spinner__bar" />
			<div className="c-spinner__bar" />
			<div className="c-spinner__bar" />
			<div className="c-spinner__bar" />
			<div className="c-spinner__bar" />
			<div className="c-spinner__bar" />
			<div className="c-spinner__bar" />
			<div className="c-spinner__bar" />
			<div className="c-spinner__bar" />
			<div className="c-spinner__bar" />
		</div>
	);
};
