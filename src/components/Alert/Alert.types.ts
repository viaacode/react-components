import type { ReactNode } from 'react';

import type { DefaultComponentProps } from '../../types';

export interface AlertPropsBase extends DefaultComponentProps {
	children?: ReactNode;
	id?: string;
	title?: ReactNode;
	content: ReactNode;
	icon?: ReactNode;
}

/**
 * Force the presence of closeIcon, onClose and closeButtonLabel props to be consistent with each other. If closeIcon is provided, onClose and closeButtonLabel must also be provided, and vice versa.
 */
export type AlertProps =
	| (AlertPropsBase & {
			closeIcon?: undefined;
			onClose?: undefined;
			closeButtonLabel?: undefined;
	  })
	| (AlertPropsBase & {
			closeIcon: ReactNode;
			onClose: (id?: string) => void;
			closeButtonLabel: string;
	  });
