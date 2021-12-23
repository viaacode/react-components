import classnames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import { DefaultProps } from '../../types';

import './Form.scss';

export interface FormPropsSchema extends DefaultProps {
	type?: 'standard' | 'horizontal' | 'inline';
	children: ReactNode;
}

export const Form: FunctionComponent<FormPropsSchema> = ({
	className,
	type = 'standard',
	children,
}) => (
	<div className={classnames(className, 'o-form-group-layout', `o-form-group-layout--${type}`)}>
		{children}
	</div>
);
