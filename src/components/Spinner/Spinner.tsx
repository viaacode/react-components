import clsx from 'clsx';
import React, { FC } from 'react';

import { SpinnerProps } from './Spinner.types';
import './Spinner.scss';

const Spinner: FC<SpinnerProps> = ({ className }) => {
	return (
		<div className={clsx('c-spinner', className)}>
			<svg
				fill="none"
				className="c-spinner__circle-svg"
				viewBox="0 0 100 100"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle className="c-spinner__circle" cx="50" cy="50" r="45" />
			</svg>
		</div>
	);
};

export default Spinner;
