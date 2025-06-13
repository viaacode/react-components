import type { DefaultComponentProps } from '../../types';

import type { TabProps } from './Tab';

export interface TabsProps extends DefaultComponentProps {
	children?: React.ReactNode;
	tabs: TabProps[];
	onClick?: (tabId: string | number) => void;
}
