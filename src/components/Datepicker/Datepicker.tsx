import clsx from 'clsx';
import React, { FC } from 'react';
import DatePicker from 'react-datepicker';

import { getVariantClasses } from '../../utils';

import { DatepickerProps } from './Datepicker.types';

import './Datepicker.scss';

const Datepicker: FC<DatepickerProps> = (props) => {
	const { className, rootClassName, variants } = props;
	const root = rootClassName || 'c-datepicker';
	const rootCls = clsx(className, root, getVariantClasses(root, variants));

	return (
		<DatePicker
			wrapperClassName={rootCls}
			calendarClassName={rootCls}
			popperClassName={rootCls}
			showPopperArrow={false}
			showMonthDropdown
			showYearDropdown
			dropdownMode="select"
			{...props}
		/>
	);
};

export default Datepicker;
