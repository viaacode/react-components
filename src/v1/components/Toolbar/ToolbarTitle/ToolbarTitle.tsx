import classnames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import { DefaultProps } from '../../../types';

import './ToolbarTitle.scss';

export interface ToolbarTitlePropsSchema extends DefaultProps {
	children: ReactNode;
}

export const ToolbarTitle: FunctionComponent<ToolbarTitlePropsSchema> = ({
	children,
	className,
}) => {
	return <h2 className={classnames(className, 'c-toolbar__title')}>{children}</h2>;
};
