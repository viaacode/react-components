import clsx from 'clsx';
import React, { FC } from 'react';

import { getVariantClasses } from '../../utils';

import { DatepickerProps } from './Datepicker.types';

const Datepicker: FC<DatepickerProps> = ({
	className,
	rootClassName: root = 'c-datepicker',
	variants,
}) => {
	const rootCls = clsx(className, root, getVariantClasses(root, variants));

	return <div className={rootCls}>Datepicker</div>;
};

export default Datepicker;
