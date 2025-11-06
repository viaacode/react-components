import type { DefaultComponentProps } from '../../types/index.js';

import type { TabProps } from './Tab/index.js';

export interface TabsProps extends DefaultComponentProps {
	children?: React.ReactNode;
	tabs: TabProps[];
	onClick?: (tabId: string | number) => void;
}
