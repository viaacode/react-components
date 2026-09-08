import type { CSSProperties, InputHTMLAttributes, MutableRefObject, RefCallback } from 'react';

export interface DefaultComponentProps {
	children?: React.ReactNode;
	className?: string;
	style?: CSSProperties;
	rootClassName?: string;
	variants?: VariantsProp;
}

export enum Locale {
	nl = 'nl',
	en = 'en',
}

export type VariantsProp = string | string[];

export type RefTypes<T> = MutableRefObject<T> | RefCallback<T> | null;

export type HTMLInputAttrs = InputHTMLAttributes<HTMLInputElement>;
