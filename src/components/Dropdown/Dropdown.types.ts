import { Options, Placement } from '@popperjs/core';
import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';

export interface DropdownProps extends DefaultComponentProps {
	children: ReactNode;
	icon?: ReactNode;
	iconOpen?: ReactNode;
	iconClosed?: ReactNode;
	isOpen: boolean;
	label?: string;
	flyoutClassName?: string;
	menuClassName?: string;
	menuRootClassName?: string;
	menuWidth?: 'fit-content' | 'fit-trigger';
	onClose?: () => void;
	onOpen?: () => void;
	placement?: Placement;
	searchMenu?: boolean;
	triggerClassName?: string;
	triggerWidth?: 'fit-content' | 'full-width';
	popper?: Partial<Options>;
}
