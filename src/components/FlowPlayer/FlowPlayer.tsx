import { type FunctionComponent, lazy, type ReactNode, Suspense, useEffect, useState } from 'react';
import { Flex } from '../Flex/Flex';
import type { FlowPlayerProps } from './FlowPlayer.types';

const FlowplayerInternal = lazy(() => import('./FlowPlayer.internal.js'));

export const FlowPlayer: FunctionComponent<
	FlowPlayerProps & { renderLoader?: () => ReactNode }
> = ({ renderLoader, ...props }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// Ensure flowplayer only renders on the client and not during server side rendering
		// Since the flowplayer library uses the browser window / document
		setMounted(true);
	}, []);

	const renderSpinner = () => {
		if (renderLoader) {
			return renderLoader();
		}

		return (
			// Fills the space the player will take up, so the loading message sits in the middle of
			// it rather than at the top edge of whatever container the player was mounted in.
			<Flex center style={{ flex: '1 1 auto', height: '100%', minHeight: '100%' }}>
				Laden ...
			</Flex>
		);
	};

	if (!mounted) {
		return renderSpinner();
	}
	return (
		<Suspense fallback={renderSpinner()}>
			<FlowplayerInternal {...props} />
		</Suspense>
	);
};
