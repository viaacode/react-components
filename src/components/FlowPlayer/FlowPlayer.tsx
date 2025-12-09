import { type FunctionComponent, lazy, type ReactNode, Suspense } from 'react';
import { isServerSideRendering } from '../../utils/is-server-side-rendering';
import { Flex } from '../Flex/Flex';
import type { FlowPlayerProps } from './FlowPlayer.types';

const FlowplayerInternal = lazy(() => import('./FlowPlayer.internal.js'));

export const FlowPlayer: FunctionComponent<
	FlowPlayerProps & { renderLoader?: () => ReactNode }
> = ({ renderLoader, ...props }) => {
	if (isServerSideRendering()) {
		// Can't render Flowplayer during server side rendering since it requires the browser window / document
		return null;
	}
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
