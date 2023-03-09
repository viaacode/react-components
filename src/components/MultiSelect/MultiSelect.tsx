import clsx from 'clsx';
import { without } from 'lodash';
import React, { FC, ReactElement, useEffect, useState } from 'react';

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
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

	useEffect(() => {
		onChange(selectedOptions);
	}, [onChange, selectedOptions]);

	const onCheckboxClick = (checked: boolean, value: unknown): void => {
		// If not checked yet, we need to add the value to the list of selected items, otherwise remove it
		// This list will be used to check whether an option should have the checked property or not, that's why the check is "reversed" here.
		const selected = !checked
			? [...selectedOptions, `${value}`]
			: without(selectedOptions, `${value}`);

		setSelectedOptions(selected);
	};

	const getLabel = () => {
		if (selectedOptions.length) {
			return `${label} (${selectedOptions.length})`;
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
					items={options.map(({ id, label }: MultiSelectOption) => ({
						value: id,
						label,
						checked: selectedOptions.includes(id),
					}))}
					onItemClick={onCheckboxClick}
				/>
			</Dropdown>
		</div>
	);
};

export default MultiSelect;
