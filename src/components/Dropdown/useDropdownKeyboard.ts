import { type KeyboardEvent, type MutableRefObject, useCallback, useEffect, useRef } from 'react';
import type { DropdownKeyboard } from './Dropdown.types';

// Everything the browser would put in the tab order. `[tabindex="-1"]` is excluded so content that
// manages its own roving focus keeps it.
const FOCUSABLE_SELECTOR = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled]):not([type="hidden"])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
].join(',');

// Not `offsetParent`, which jsdom always reports as null. `visibility` inherits, so this also drops
// the whole subtree of a hidden container - including a closed flyout's own `.c-menu`.
const isVisible = (element: HTMLElement) => getComputedStyle(element).visibility !== 'hidden';

const focusFirstIn = (container: Element | null) => {
	if (!container) {
		return;
	}
	const target = container.matches(FOCUSABLE_SELECTOR)
		? (container as HTMLElement)
		: container.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
	target?.focus();
};

export interface UseDropdownKeyboardOptions {
	keyboard: DropdownKeyboard;
	isOpen: boolean;
	onOpen: () => void;
	/** The floating element holding the flyout content. */
	flyoutRef: MutableRefObject<HTMLElement | null>;
	/** The element wrapping the trigger - focus is returned to the first focusable inside it. */
	triggerRef: MutableRefObject<Element | null>;
}

/**
 * The keyboard half of the disclosure pattern: moving focus into the flyout and back out again, and
 * (in `menu` mode) between its items.
 *
 * Returns focus to the trigger whenever the flyout closes while focus was still inside it - in every
 * mode, `none` included. Closing a Dropdown only hides its content, so without this the focused
 * element simply stops being focusable and the browser drops focus to `<body>`: the keyboard user
 * loses their place in the page (WCAG 2.4.3).
 */
export function useDropdownKeyboard({
	keyboard,
	isOpen,
	onOpen,
	flyoutRef,
	triggerRef,
}: UseDropdownKeyboardOptions) {
	const focusWasInsideRef = useRef(false);
	const wasOpenRef = useRef(isOpen);
	// Which end to land on once the consumer has actually opened us - opening is their state change,
	// so it can't be done in the same tick as the keypress that asked for it.
	const pendingFocusRef = useRef<'first' | 'last'>('first');

	const getItems = useCallback(
		() =>
			Array.from(flyoutRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []).filter(
				isVisible
			),
		[flyoutRef]
	);

	// Where focus sat has to be recorded as it moves: by the time the close is observable in an
	// effect, hiding the content has already blurred it and `document.activeElement` reads `<body>`.
	useEffect(() => {
		const flyout = flyoutRef.current;
		if (!flyout) {
			return;
		}
		const handleFocusIn = () => {
			focusWasInsideRef.current = true;
		};
		const handleFocusOut = (event: FocusEvent) => {
			const next = event.relatedTarget as Node | null;
			// A null `relatedTarget` is focus going nowhere - the element was hidden, or the window
			// lost focus. Neither is the user moving away, and clearing here would drop the handover.
			if (next) {
				focusWasInsideRef.current = flyout.contains(next);
			}
		};
		flyout.addEventListener('focusin', handleFocusIn);
		flyout.addEventListener('focusout', handleFocusOut);
		return () => {
			flyout.removeEventListener('focusin', handleFocusIn);
			flyout.removeEventListener('focusout', handleFocusOut);
		};
	}, [flyoutRef]);

	useEffect(() => {
		const wasOpen = wasOpenRef.current;
		wasOpenRef.current = isOpen;
		if (wasOpen === isOpen) {
			return;
		}

		if (isOpen) {
			focusWasInsideRef.current = false;
			if (keyboard !== 'none') {
				const items = getItems();
				const item = pendingFocusRef.current === 'last' ? items[items.length - 1] : items[0];
				item?.focus();
			}
			pendingFocusRef.current = 'first';
			return;
		}

		if (focusWasInsideRef.current) {
			focusWasInsideRef.current = false;
			focusFirstIn(triggerRef.current);
		}
	}, [isOpen, keyboard, getItems, triggerRef]);

	// ArrowDown/ArrowUp on a menu trigger opens onto the first/last option, per the APG menu-button
	// pattern - and matching the native players and menus these flyouts sit next to.
	const handleTriggerKeyDown = (event: KeyboardEvent<HTMLElement>) => {
		if (keyboard !== 'menu' || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) {
			return;
		}
		event.preventDefault();
		// Keeps an enclosing widget from also acting on a key the menu has taken.
		event.stopPropagation();

		if (!isOpen) {
			pendingFocusRef.current = event.key === 'ArrowUp' ? 'last' : 'first';
			onOpen();
			return;
		}
		const items = getItems();
		(event.key === 'ArrowUp' ? items[items.length - 1] : items[0])?.focus();
	};

	const handleFlyoutKeyDown = (event: KeyboardEvent<HTMLElement>) => {
		if (keyboard !== 'menu') {
			return;
		}
		const items = getItems();
		if (!items.length) {
			return;
		}
		const current = items.indexOf(document.activeElement as HTMLElement);
		let next: number;
		switch (event.key) {
			case 'ArrowDown':
				next = current < 0 ? 0 : (current + 1) % items.length;
				break;
			case 'ArrowUp':
				next = current < 0 ? items.length - 1 : (current - 1 + items.length) % items.length;
				break;
			case 'Home':
				next = 0;
				break;
			case 'End':
				next = items.length - 1;
				break;
			default:
				return;
		}
		items[next]?.focus();
		event.preventDefault();
		event.stopPropagation();
	};

	return { handleTriggerKeyDown, handleFlyoutKeyDown };
}
