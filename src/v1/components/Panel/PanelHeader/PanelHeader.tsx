import classnames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import { DefaultProps } from '../../../types';

export interface PanelHeaderProps extends DefaultProps {
	children: ReactNode;
}

export const PanelHeader: FunctionComponent<PanelHeaderProps> = ({ children, className }) => {
	return <div className={classnames(className, 'c-panel__header')}>{children}</div>;
};
