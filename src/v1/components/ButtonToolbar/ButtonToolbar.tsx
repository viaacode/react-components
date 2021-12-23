import classnames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import { DefaultProps } from '../../types';

import './ButtonToolbar.scss';

export interface ButtonToolbarPropsSchema extends DefaultProps {
	children: ReactNode;
}

const ButtonToolbar: FunctionComponent<ButtonToolbarPropsSchema> = ({
	className = '',
	children,
}) => <div className={classnames(className, 'c-button-toolbar')}>{children}</div>;

export { ButtonToolbar };
