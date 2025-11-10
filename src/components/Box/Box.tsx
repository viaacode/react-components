import clsx from 'clsx';
import type { FC } from 'react';

import { getVariantClasses } from '../../utils/index.js';

import type { BoxProps } from './Box.types.js';

const Box: FC<BoxProps> = ({ children, className, rootClassName: root = 'c-box', variants }) => {
	const rootCls = clsx(className, root, getVariantClasses(root, variants));
	return <div className={rootCls}>{children}</div>;
};

export default Box;
