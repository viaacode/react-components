import clsx from 'clsx';
import React, { FC } from 'react';
import DatePicker from 'react-datepicker';

import { VariantsProp } from '../../types';
import { getVariantClasses } from '../../utils';

import { TimepickerProps } from './Timepicker.types';

const Timepicker: FC<TimepickerProps> = (props) => {
	const { variants, className } = props;

	const getVariants = (): VariantsProp => {
		if (variants) {
			if (typeof variants === 'string') {
				return [variants, 'time'];
			} else {
				return [...variants, 'time'];
			}
		}

		return ['time'];
	};

	const classNames = clsx(
		className,
		'c-datepicker',
		getVariantClasses('c-datepicker', getVariants())
	);

	return (
		<DatePicker
			wrapperClassName={classNames}
			calendarClassName={classNames}
			popperClassName={classNames}
			showPopperArrow={false}
			showMonthDropdown
			showYearDropdown
			dropdownMode="select"
			{...props}
		/>
	);
};

export default Timepicker;
