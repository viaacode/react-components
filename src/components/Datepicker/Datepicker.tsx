import clsx from 'clsx';
import React, { FC } from 'react';
import DatePicker from 'react-datepicker';

import { getVariantClasses } from '../../utils';

import { DatepickerProps } from './Datepicker.types';

import './Datepicker.scss';

const Datepicker: FC<DatepickerProps> = (props) => {
	const { className, rootClassName: root = 'c-datepicker', variants } = props;
	const rootCls = clsx(className, root, getVariantClasses(root, variants));

	return <DatePicker wrapperClassName={rootCls} showPopperArrow={false} {...props} />;
};

export default Datepicker;
