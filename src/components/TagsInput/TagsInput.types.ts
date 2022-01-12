import { ReactNode } from 'react';
import { GroupBase, Props as ReactSelectProps } from 'react-select';
import { CreatableProps } from 'react-select/creatable';

import { DefaultComponentProps } from '../../types';

export type TagsInputProps<
	AllowMulti extends boolean = true,
	Group extends TagsInputGroup = TagsInputGroup
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
