import classnames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import { DefaultProps } from '../../types';

export interface CheckboxGroupPropsSchema extends DefaultProps {
	inline?: boolean;
	children: ReactNode;
}

export const CheckboxGroup: FunctionComponent<CheckboxGroupPropsSchema> = ({
	children,
	className,
	inline = false,
}) => (
	<div
		className={classnames(className, 'c-checkbox-group', {
			'c-checkbox-group--inline': inline,
		})}
	>
		{children}
	</div>
);
