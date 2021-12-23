import { CSSProperties, ReactElement, ReactNode } from 'react';

export * from './content-type';

export type DefaultProps = {
	className?: string;
	style?: CSSProperties;
};

export type VideoAspectRatio = '3:2' | '16:9';

export type HeadingType = 'h1' | 'h2' | 'h3' | 'h4';

export type AlignOptions = 'left' | 'center' | 'right';

export type ContentPickerType =
	| 'CONTENT_PAGE'
	| 'COLLECTION'
	| 'ITEM'
	| 'BUNDLE'
	| 'DROPDOWN'
	| 'INTERNAL_LINK'
	| 'EXTERNAL_LINK'
	| 'SEARCH_QUERY'
	| 'PROJECTS'
	| 'ANCHOR_LINK'
	| 'PROFILE'
	| 'FILE'; // TODO move to typings and make typings repo a dependency of the components repo

export enum LinkTarget {
	Self = '_self',
	Blank = '_blank',
}

export interface ButtonAction {
	type: ContentPickerType;
	value: string | number;
	target?: LinkTarget;
}

export type Orientation = 'horizontal' | 'vertical';

export type RenderLinkFunction = (
	buttonAction: ButtonAction | null | undefined,
	children: ReactNode,
	label?: string
) => ReactElement<any, any> | null;
