import clsx from 'clsx';
import { type FC, forwardRef } from 'react';
import Select from 'react-select';

import { assignRef, getVariantClasses } from '../../../utils';

import type { ReactSelectProps } from './ReactSelect.types';

const ReactSelect: FC<ReactSelectProps> = forwardRef(
	({ className, rootClassName: root = 'c-react-select', variants, ...reactSelectProps }, ref) => {
		const rootCls = clsx(className, root, getVariantClasses(root, variants));

		// For multi select check out the TagsInput component
		return (
			<Select
				{...reactSelectProps}
				className={rootCls}
				classNamePrefix={root}
				isMulti={false}
				ref={(innerRef) => assignRef(ref, innerRef)}
			/>
		);
	}
);

export default ReactSelect;
