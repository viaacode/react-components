import clsx from 'clsx';
import React, { type FC, type ReactElement, useState } from 'react';
import { Button } from '../Button';

import { CheckboxList } from '../CheckboxList';
import { Dropdown } from '../Dropdown';

import type { MultiSelectOption, MultiSelectProps } from './MultiSelect.types';

const MultiSelect: FC<MultiSelectProps> = ({
	className,
	label,
	options,
	onChange,
	variant = 'bordered',
	iconOpen,
	iconClosed,
	iconCheck,
	confirmOptions,
	resetOptions,
}): ReactElement => {
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
	const [checkedStates, setCheckedStates] = useState(options);

	const getLabel = () => {
		const checkedOptions = options.filter((option) => option.checked).length;

		if (checkedOptions > 0) {
			return `${label} (${checkedOptions})`;
		}
		return label;
	};

	// Map a list of MultiSelectOption to Ids, but keep only the checked options
	const getCheckedIdList = (list: MultiSelectOption[]) => {
		return list.filter((item) => item.checked).map((item) => item.id);
	};

	// Resetting the entire form to the initial options
	const resetInternalCheckboxStates = () => {
		setCheckedStates(options);
		resetOptions?.onClick?.(getCheckedIdList(options));
	};

	// Open the dropdown and make sure the checkboxes are checked where expected
	const openDropdown = () => {
		resetInternalCheckboxStates();
		setIsDropdownOpen(true);
	};

	const closeDropdown = () => {
		setIsDropdownOpen(false);
	};

	const applyFilter = () => {
		confirmOptions?.onClick?.(getCheckedIdList(checkedStates));
	};

	const handleCheckboxToggled = (checked: boolean, toggledCheckboxId: unknown) => {
		// Set the internal state
		setCheckedStates((prevState) => {
			return prevState.map((item) => {
				if (item.id === toggledCheckboxId) {
					return { ...item, checked: !item.checked };
				}
				return item;
			});
		});

		// Only when we are not using the confirm button, we expect the state to be updated immediately
		if (!confirmOptions) {
			onChange(checked, toggledCheckboxId as string);
		}
	};

	return (
		<div className={clsx(className, 'c-multi-select')}>
			<Dropdown
				variants={variant}
				className="c-multi-select__dropdown"
				label={getLabel()}
				isOpen={isDropdownOpen}
				onOpen={openDropdown}
				onClose={closeDropdown}
				iconOpen={iconOpen}
				iconClosed={iconClosed}
			>
				<CheckboxList
					checkIcon={iconCheck}
					className="c-multi-select__checkbox-list"
					itemClassName="c-multi-select__checkbox-list-item"
					items={checkedStates.map(({ id, label, checked }: MultiSelectOption) => ({
						value: id,
						label,
						checked,
					}))}
					onItemClick={handleCheckboxToggled}
				/>
				{confirmOptions && (
					<div className="c-multi-select__footer">
						{resetOptions && (
							<Button
								className="c-multi-select__reset"
								iconStart={resetOptions.icon}
								label={resetOptions.label}
								variants={resetOptions.variants}
								onClick={resetInternalCheckboxStates}
							/>
						)}
						<Button
							className="c-multi-select__submit"
							label={confirmOptions.label}
							variants={confirmOptions.variants}
							onClick={applyFilter}
						/>
					</div>
				)}
			</Dropdown>
		</div>
	);
};

export default MultiSelect;
