import type { Placement } from '@floating-ui/react';
import type { ReactNode } from 'react';

import type { DefaultComponentProps } from '../../types';

export interface DropdownProps extends DefaultComponentProps {
	children: ReactNode;
	icon?: ReactNode;
	iconOpen?: ReactNode;
	iconClosed?: ReactNode;
	isOpen: boolean;
	label?: string;
	id: string;
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
	isDisabled?: boolean;
	offset?: number;
	/**
	 * Opts into floating-ui's `shift` middleware, nudging the flyout back within its clipping
	 * ancestor (e.g. a container with `overflow: hidden`) instead of letting it get silently
	 * clipped. Off by default so existing consumers keep their current positioning unchanged; pass
	 * a padding value (in px) to enable it.
	 */
	shiftPadding?: number;
}
