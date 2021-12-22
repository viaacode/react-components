import classnames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import { DefaultProps, EnglishContentType } from '../../types';

import './MetaData.scss';

export interface MetaDataPropsSchema extends DefaultProps {
	children: ReactNode;
	category: EnglishContentType;
	spaced?: boolean;
}

export const MetaData: FunctionComponent<MetaDataPropsSchema> = ({
	children,
	className,
	category,
	spaced,
}) => (
	<ul
		className={classnames(className, `c-meta-data c-meta-data--${category}`, {
			'c-meta-data--spaced-out': spaced,
		})}
	>
		{children}
	</ul>
);
