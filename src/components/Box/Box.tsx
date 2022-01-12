import clsx from 'clsx';
import React, { FC } from 'react';

import { getVariantClasses } from '../../utils';

import { BoxProps } from './Box.types';

const Box: FC<BoxProps> = ({ children, className, rootClassName: root = 'c-box', variants }) => {
	const rootCls = clsx(className, root, getVariantClasses(root, variants));
	return <div className={rootCls}>{children}</div>;
};

export default Box;
