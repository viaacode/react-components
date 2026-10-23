import type { ReactNode } from 'react';

import type { DefaultComponentProps, HTMLInputAttrs } from '../../types';

export interface CheckboxProps extends DefaultComponentProps, HTMLInputAttrs {
	children?: ReactNode;
	checkIcon?: ReactNode;
	/**
	 * Shows the checkbox as partially checked, eg: when only some of the items in a group are selected
	 * Takes precedence over checked for the visual state, screen readers announce it as "mixed"
	 */
	indeterminate?: boolean;
	/**
	 * Icon shown instead of the checkIcon when the checkbox is indeterminate
	 */
	indeterminateIcon?: ReactNode;
	label?: string | ReactNode;
	showSpinner?: boolean;
}
