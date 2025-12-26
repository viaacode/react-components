import type { TextareaHTMLAttributes } from 'react';

import type { DefaultComponentProps } from '../../types';

export type HTMLTextAreaAttrs = TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface TextAreaProps extends DefaultComponentProps, HTMLTextAreaAttrs {
	children?: React.ReactNode;
	autoHeight?: boolean;
}
