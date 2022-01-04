import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import { DefaultProps } from '../../types';

import { Tab, TabPropsSchema } from './Tab/Tab';

export interface TabsPropsSchema extends DefaultProps {
	tabs: TabPropsSchema[];
	border?: boolean;
	dark?: boolean;
	onClick?: (tabId: string | number) => void;
}

export const Tabs: FunctionComponent<TabsPropsSchema> = ({
	className,
	tabs,
	border,
	dark = false,
	onClick = () => null,
}) => (
	<nav
		className={classnames(className, 'c-tabs', {
			'c-tabs__bottom-border': border,
		})}
	>
		{tabs.map((tab) => (
			<Tab key={tab.label} {...tab} dark={dark} onClick={() => onClick(tab.id)} />
		))}
	</nav>
);
