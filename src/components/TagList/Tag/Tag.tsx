import clsx from 'clsx';
import React, { FC } from 'react';

import { bemCls, getVariantClasses } from '../../../utils';

import { TagEvents, TagProps } from './Tag.types';

const Tag: FC<TagProps> = ({
	active,
	className,
	closeButton,
	closeIcon = 'X',
	disabled = false,
	id,
	label,
	rootClassName: root = 'c-tag',
	variants,
	onClick,
	onClose,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants), {
		[bem('', 'active')]: active,
		[bem('', 'disabled')]: disabled,
	});
	const isClickable = typeof onClick === 'function';
	const isClosable = typeof onClose === 'function';

	const onTagClick = (e: TagEvents<HTMLSpanElement>) => {
		if (!disabled && isClickable) {
			onClick(id, e);
		}
	};

	const onTagClose = (e: TagEvents<HTMLButtonElement>) => {
		if (isClickable) {
			e.stopPropagation();
		}

		if (!disabled && isClosable) {
			onClose(id, e);
		}
	};

	return (
		<div
			className={rootCls}
			role="button"
			style={isClickable ? { cursor: 'pointer' } : {}}
			tabIndex={isClickable && !disabled ? 0 : -1}
			onClick={onTagClick}
			onKeyPress={(e) => e.key === 'Enter' && onTagClick(e)}
		>
			<span className={bem('label')}>{label}</span>

			{isClosable && !closeButton ? (
				<button
					className={bem('close')}
					onClick={onTagClose}
					onKeyPress={(e) => e.key === 'Enter' && onTagClose(e)}
				>
					{closeIcon}
				</button>
			) : (
				closeButton
			)}
		</div>
	);
};

export default Tag;
