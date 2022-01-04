/* eslint-disable jsx-a11y/interactive-supports-focus */
import clsx from 'clsx';
import React, { FC, KeyboardEvent, MouseEvent } from 'react';

import { bemCls } from '../../utils/bem-class';
import { getVariantClasses } from '../../utils/variant-classes';

import { TagListProps, TagOption } from './TagList.types';

const TagList: FC<TagListProps> = ({
	className,
	tags,
	swatches = true,
	bordered = true,
	closable = false,
	selectable = false,
	onTagClosed = () => null,
	onTagClicked,
	closeIcon,
	rootClassName: root = 'c-tag-list',
	variants,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants));

	const safeOnTagClicked = onTagClicked || (() => null);

	return !!tags && !!tags.length ? (
		<ul className={rootCls}>
			{tags.map((tag: TagOption, index) => (
				<li
					// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
					tabIndex={selectable && !tag.disabled ? 0 : -1}
					className={clsx(
						bem('tag'),
						getVariantClasses(bem('tag'), variants),
						tag.disabled && bem('tag', 'disabled'),
						{
							'c-tag': bordered,
							'c-label': !bordered,
							'c-tag__active': selectable && tag.active,
						}
					)}
					key={tag.id}
				>
					{/* output swatch element */}
					{swatches && (
						<div
							className={clsx('c-label-swatch', {
								[`c-label-swatch--color-${(index % 10) + 1}`]: !tag.color,
							})}
							onClick={(evt: MouseEvent) =>
								tag.disabled ? () => null : safeOnTagClicked(tag.id, evt)
							}
							onKeyPress={(evt: KeyboardEvent) =>
								evt.key === 'Enter' && !tag.disabled
									? safeOnTagClicked(tag.id, evt)
									: () => null
							}
							style={{
								...(onTagClicked ? { cursor: 'pointer' } : {}),
								...(tag.color ? { backgroundColor: tag.color } : {}),
							}}
							role="button"
						/>
					)}
					{/* output label text element */}
					<span
						className={clsx({
							'c-tag__label': !swatches && closable,
							'c-label-text': swatches,
						})}
						onClick={(evt: MouseEvent) =>
							tag.disabled ? () => null : safeOnTagClicked(tag.id, evt)
						}
						onKeyPress={(evt: KeyboardEvent) =>
							evt.key === 'Enter' && !tag.disabled
								? safeOnTagClicked(tag.id, evt)
								: () => null
						}
						style={onTagClicked ? { cursor: 'pointer' } : {}}
						role="button"
					>
						{tag.label}
					</span>

					{/* output close button element */}
					{closable && (
						// eslint-disable-next-line jsx-a11y/anchor-is-valid
						<a
							onClick={(evt: MouseEvent) =>
								tag.disabled ? () => null : onTagClosed(tag.id, evt)
							}
							onKeyPress={(evt: KeyboardEvent) =>
								evt.key === 'Enter' && !tag.disabled
									? onTagClosed(tag.id, evt)
									: () => null
							}
							role="button"
						>
							{closeIcon}
						</a>
					)}
				</li>
			))}
		</ul>
	) : null;
};

export default TagList;
