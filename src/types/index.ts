import { CSSProperties } from 'react';

export interface DefaultComponentProps {
	className?: string;
	style?: CSSProperties;
	rootClassName?: string;
	variants?: VariantsProp;
}

export type VariantsProp = string | string[];
