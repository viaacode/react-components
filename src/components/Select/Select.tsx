import clsx from 'clsx';
import { forwardRef, type ReactNode } from 'react';

import { bemCls, getVariantClasses } from '../../utils/index';

import type { SelectProps } from './Select.types';

const Select = forwardRef<HTMLSelectElement, SelectProps>(
	(
		{
			className,
			disabled,
			iconEnd,
			iconStart,
			rootClassName: root = 'c-select',
			options = [],
			variants,
			...selectProps
		},
		ref
	) => {
		const bem = bemCls.bind(root);
		const rootCls = clsx(className, root, getVariantClasses(root, variants), {
			[bem('', 'disabled')]: disabled,
			[bem('', 'icon-start')]: iconStart,
			[bem('', 'icon-end')]: iconEnd,
		});

		const renderIcon = (iconNode: ReactNode, side?: 'start' | 'end') => (
			<span
				className={clsx(bem('icon'), {
					[bem('icon', side)]: side,
				})}
			>
				{iconNode}
			</span>
		);

		return (
			<div className={rootCls}>
				{iconStart && renderIcon(iconStart, 'start')}
				<select {...selectProps} className={bem('element')} ref={ref}>
					{options.map(({ label, value }) => (
						<option key={`select-option-${value}`} value={value}>
							{label}
						</option>
					))}
				</select>
				{iconEnd && renderIcon(iconEnd, 'end')}
			</div>
		);
	}
);

export default Select;
