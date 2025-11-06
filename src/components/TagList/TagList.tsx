/* eslint-disable jsx-a11y/interactive-supports-focus */
import clsx from 'clsx';
import React, { type FC } from 'react';

// import { VariantsProp } from '../../types';
import { bemCls, getVariantClasses, getVariantsArray } from '../../utils/index.js';

import { Tag } from './Tag/index.js';
import type { TagListProps, TagOption } from './TagList.types.js';

const TagList: FC<TagListProps> = ({
	className,
	closeIcon,
	rootClassName: root = 'c-tag-list',
	tags,
	variants,
	onTagClosed,
	onTagClicked,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants));

	return !!tags && !!tags.length ? (
		<ul className={rootCls}>
			{tags.map((tag: TagOption) => {
				const tagVariants = [...getVariantsArray(variants), ...getVariantsArray(tag.variants)];

				return (
					<li key={tag.id} className={clsx(bem('item'))}>
						<Tag
							{...tag}
							className={clsx(bem('tag'))}
							closeIcon={closeIcon}
							variants={tagVariants}
							onClick={onTagClicked}
							onClose={onTagClosed}
						/>
					</li>
				);
			})}
		</ul>
	) : null;
};

export default TagList;
