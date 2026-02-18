import type { ReactNode, TextareaHTMLAttributes } from 'react';

import type { DefaultComponentProps } from '../../types';

export type HTMLTextAreaAttrs = TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface TextAreaProps extends DefaultComponentProps, HTMLTextAreaAttrs {
	children?: ReactNode;
	autoHeight?: boolean;
	ariaLabel: string;
}
