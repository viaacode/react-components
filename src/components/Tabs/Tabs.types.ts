import type { DefaultComponentProps } from '../../types/index';

import type { TabProps } from './Tab/index';

export interface TabsProps extends DefaultComponentProps {
	children?: React.ReactNode;
	tabs: TabProps[];
	onClick?: (tabId: string | number) => void;
}
