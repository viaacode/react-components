import React, { FunctionComponent, Suspense } from 'react';

import { Flex } from '../Flex/Flex';
import { Spinner } from '../Spinner/Spinner';

import { WYSIWYGPropsSchema } from './WYSIWYG.types';

const WYSIWYGInternal = React.lazy(() => import('./WYSIWYGInternal'));

export const WYSIWYG: FunctionComponent<WYSIWYGPropsSchema> = (props) => {
	return (
		<Suspense
			fallback={
				<Flex orientation="horizontal" center>
					<Spinner size="large" />
				</Flex>
			}
		>
			<WYSIWYGInternal {...props} />
		</Suspense>
	);
};
