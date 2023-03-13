import clsx from 'clsx';
import React, { FC, ReactElement, useState } from 'react';

import { CheckboxList } from '../CheckboxList';
import { Dropdown } from '../Dropdown';

import { MultiSelectOption, MultiSelectProps } from './MultiSelect.types';

const MultiSelect: FC<MultiSelectProps> = ({
	className,
	label,
	options,
	onChange,
	variant = 'bordered',
	iconOpen,
	iconClosed,
	iconCheck,
}): ReactElement => {
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

	const getLabel = () => {
		const checkedOptions = options.filter((option) => option.checked).length;

		if (checkedOptions > 0) {
			return `${label} (${checkedOptions})`;
		}
		return label;
	};

	return (
		<div className={clsx(className, 'c-multi-select')}>
			<Dropdown
				variants={variant}
				className="c-multi-select__dropdown"
				label={getLabel()}
				isOpen={isDropdownOpen}
				onOpen={() => setIsDropdownOpen(true)}
				onClose={() => setIsDropdownOpen(false)}
				iconOpen={iconOpen}
				iconClosed={iconClosed}
			>
				<CheckboxList
					checkIcon={iconCheck}
					className={'c-multi-select__checkbox-list'}
					itemClassName={'c-multi-select__checkbox-list-item'}
					items={options.map(({ id, label, checked }: MultiSelectOption) => ({
						value: id,
						label,
						checked,
					}))}
					onItemClick={(checked, value) => onChange(checked, value as string)}
				/>
			</Dropdown>
		</div>
	);
};

export default MultiSelect;
