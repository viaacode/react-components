import type { Placement } from '@floating-ui/react';
import type { ReactNode } from 'react';

import type { DefaultComponentProps } from '../../types';

/** See `DropdownProps.keyboard`. */
export type DropdownKeyboard = 'none' | 'dialog' | 'menu';

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
	/**
	 * Opts into floating-ui's `size` middleware, capping the flyout's height to whatever space is
	 * actually available in its clipping ancestor and the viewport (scrolling its own content
	 * instead of overflowing past that ancestor's edge), with this many px kept clear on every
	 * side. Off by default so existing consumers keep their current (unconstrained) height.
	 */
	maxHeightPadding?: number;
	/**
	 * Keyboard behaviour for the flyout, named after the `aria-haspopup` value the trigger
	 * advertises:
	 * - `none` (the default): nothing added. Escape still closes the flyout.
	 * - `dialog`: focus moves into the flyout, onto its first focusable element, when it opens. For
	 *   content that owns its own keys - a slider, a text field.
	 * - `menu`: as `dialog`, plus ArrowUp/ArrowDown/Home/End moving between the flyout's focusable
	 *   items, and ArrowUp/ArrowDown on the trigger opening it onto the last/first one. For option
	 *   lists; content with a text field would lose those keys to the navigation.
	 *
	 * Regardless of this value, focus returns to the trigger whenever the flyout closes while focus
	 * was still inside it - closing only hides the content, so focus would otherwise be dropped to
	 * `<body>`.
	 */
	keyboard?: DropdownKeyboard;
}
