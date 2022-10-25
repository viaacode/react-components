import React, { FunctionComponent, Suspense } from 'react';

import { Flex } from '../Flex/Flex';

import { FlowPlayerProps } from './FlowPlayer.types';

const FlowPlayerInternal = React.lazy(() => import('./FlowPlayer.internal'));

export const FlowPlayer: FunctionComponent<FlowPlayerProps> = (props) => {
	return (
		<Suspense
			fallback={
				<Flex orientation="horizontal" center>
					Laden ...
				</Flex>
			}
		>
			<FlowPlayerInternal {...props} />
		</Suspense>
	);
};
