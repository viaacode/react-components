import { type FunctionComponent, lazy, type ReactNode, Suspense } from 'react';

import { Flex } from '../Flex/Flex';

import type { FlowPlayerProps } from './FlowPlayer.types';

const FlowplayerInternal = lazy(() => import('./FlowPlayer.internal.js'));

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
