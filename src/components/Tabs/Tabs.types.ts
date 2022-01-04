import { DefaultComponentProps } from '../../types';

import { TabProps } from './Tab';

export interface TabsProps extends DefaultComponentProps {
	tabs: TabProps[];
	onClick?: (tabId: string | number) => void;
}
