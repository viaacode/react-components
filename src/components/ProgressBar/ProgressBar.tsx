import clsx from 'clsx';
import React, { FC } from 'react';

import { getVariantClasses } from '../../utils';

import { ProgressBarProps } from './ProgressBar.types';

import './ProgressBar.scss';

const ProgressBar: FC<ProgressBarProps> = ({
	className,
	rootClassName: root = 'c-progress-bar',
	variants,
	percentage,
}) => {
	const rootCls = clsx(className, root, getVariantClasses(root, variants));
	const roundedPercentage = Math.round(percentage);
	return (
		<div className={rootCls}>
			<div className="c-progress-bar__fill" style={{ width: percentage + '%' }} />
			<span
				className="c-progress-bar__label--dark"
				style={{
					// Add a clip path based on the inverted percentage
					clipPath: `inset(0 0 0 ${percentage}%)`,
				}}
			>
				{roundedPercentage}%
			</span>
			<span
				className="c-progress-bar__label--light"
				style={{
					// Add a clip path based on the percentage
					clipPath: `inset(0 ${100 - percentage}% 0 0)`,
				}}
			>
				{roundedPercentage}%
			</span>
		</div>
	);
};

export default ProgressBar;
