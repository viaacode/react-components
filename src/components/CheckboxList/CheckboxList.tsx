import clsx from 'clsx';
import type { FC } from 'react';

import { keysEnter, keysSpacebar, onKey } from '../../utils/index';
import Checkbox from '../Checkbox/Checkbox';

import './CheckboxList.scss';
import type { CheckboxListProps } from './CheckboxList.types';

const CheckboxList: FC<CheckboxListProps<unknown>> = ({
	items,
	className,
	itemClassName,
	checkIcon = null,
	onItemClick,
}) => {
	return (
		<ul className={clsx(className, 'c-checkbox-list')}>
			{items.map((item, i) => {
				const value = item.value;
				const isChecked = !!item.checked;

				return (
					<li
						key={`c-checkbox-list--${i}--${value}`}
						className={clsx('c-checkbox-list__item', itemClassName, {
							'is-checked': isChecked,
						})}
						// biome-ignore lint/a11y/noNoninteractiveTabindex: TODO fix
						tabIndex={0}
						onKeyDown={(e) =>
							onKey(e, [...keysEnter, ...keysSpacebar], () => {
								if (keysSpacebar.includes(e.key)) {
									e.preventDefault();
								}

								onItemClick(isChecked, value);
							})
						}
						onClick={() => onItemClick(isChecked, value)}
					>
						<Checkbox checked={isChecked} tabIndex={-1} checkIcon={checkIcon} />
						<span>{item.label}</span>
					</li>
				);
			})}
		</ul>
	);
};

export default CheckboxList;
