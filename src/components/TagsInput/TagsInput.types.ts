import type { ReactNode } from 'react';
import type { GroupBase, Props as ReactSelectProps } from 'react-select';
import type { CreatableProps } from 'react-select/creatable';

import type { DefaultComponentProps } from '../../types/index';

export type TagsInputProps<
	AllowMulti extends boolean = true,
	Group extends TagsInputGroup = TagsInputGroup,
> = DefaultComponentProps &
	(
		| (CreatableProps<TagInfo, AllowMulti, Group> & { allowCreate?: true })
		| (ReactSelectProps<TagInfo, AllowMulti, Group> & { allowCreate?: false })
	);

export type TagsInputGroup = GroupBase<TagInfo>;

export interface TagInfo {
	label: string | ReactNode;
	value: string | number;
}
