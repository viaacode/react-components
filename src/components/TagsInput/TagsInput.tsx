import clsx from 'clsx';
import React, { type ReactElement } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { bemCls, getVariantClasses } from '../../utils/index.js';

import type { TagsInputGroup, TagsInputProps } from './TagsInput.types.js';

const TagsInput = <
	AllowMulti extends boolean = true,
	Group extends TagsInputGroup = TagsInputGroup,
>({
	allowCreate = false,
	className = '',
	isMulti = true as AllowMulti,
	rootClassName: root = 'c-tags-input',
	variants,
	...rest
}: TagsInputProps<AllowMulti, Group>): ReactElement => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants), {
		[bem('', 'creatable')]: allowCreate,
	});

	return allowCreate ? (
		<CreatableSelect {...rest} className={rootCls} classNamePrefix={root} isMulti={isMulti} />
	) : (
		<Select {...rest} className={rootCls} classNamePrefix={root} isMulti={isMulti} />
	);
};

export default TagsInput;
