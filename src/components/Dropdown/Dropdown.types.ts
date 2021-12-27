import { Placement } from '@popperjs/core';
import { ReactNode } from 'react';

import { DefaultComponentProps } from '../../types';
import { IconNameSchema } from '../../v1/components/Icon/Icon.types';

export interface DropdownProps extends DefaultComponentProps {
	children: ReactNode;
	icon?: IconNameSchema;
	isOpen: boolean;
	label?: string;
	menuClassName?: string;
	menuRootClassName?: string;
	menuWidth?: 'fit-content' | 'fit-trigger';
	onClose?: () => void;
	onOpen?: () => void;
	placement?: Placement;
	searchMenu?: boolean;
	triggerClassName?: string;
	triggerWidth?: 'fit-content' | 'full-width';
}
