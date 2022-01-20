import React, { FC } from 'react';

import { VariantsProp } from '../../types';
import { Datepicker } from '../Datepicker';

import { TimepickerProps } from './Timepicker.types';

const Timepicker: FC<TimepickerProps> = (props) => {
	const { variants } = props;

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

	return <Datepicker {...props} variants={getVariants()} />;
};

export default Timepicker;
