import React, { FunctionComponent, ReactNode, Suspense } from 'react';

import { Flex } from '../Flex/Flex';

import { FlowPlayerProps } from './FlowPlayer.types';

const FlowplayerInternal = React.lazy(() => import('./FlowPlayer.internal'));

export const FlowPlayer: FunctionComponent<
	FlowPlayerProps & { renderLoader?: () => ReactNode }
> = ({ renderLoader, ...props }) => {
	return (
		<Suspense
			fallback={
				renderLoader ? (
					renderLoader()
				) : (
					<Flex orientation="horizontal" center>
						Laden ...
					</Flex>
				)
			}
		>
			<FlowplayerInternal {...props} />
		</Suspense>
	);
};
