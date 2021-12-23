import classnames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import { DefaultProps } from '../../types';

import './ButtonGroup.scss';

export interface ButtonGroupPropsSchema extends DefaultProps {
	children: ReactNode;
}

const ButtonGroup: FunctionComponent<ButtonGroupPropsSchema> = ({ className = '', children }) => (
	<div className={classnames(className, 'c-button-group')}>{children}</div>
);

export { ButtonGroup };
