import type { TextareaHTMLAttributes } from 'react';

import type { DefaultComponentProps } from '../../types/index.js';

export type HTMLTextAreaAttrs = TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface TextAreaProps extends DefaultComponentProps, HTMLTextAreaAttrs {
	children?: React.ReactNode;
	autoHeight?: boolean;
}
