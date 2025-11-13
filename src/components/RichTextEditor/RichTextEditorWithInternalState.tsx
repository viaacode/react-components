import { type FunctionComponent, lazy, Suspense } from 'react';

import { Flex } from '../Flex/Flex';

import type { RichTextEditorWithInternalStateProps } from './RichTextEditor.types';

const RichTextEditorInternalWithInternalState = lazy(
	() => import('./RichTextEditorInternalWithInternalState.js')
);

const RichTextEditorWithInternalState: FunctionComponent<RichTextEditorWithInternalStateProps> = (
	props
) => {
	return (
		<Suspense
			fallback={
				<Flex orientation="horizontal" center>
					<p>Laden...</p>
				</Flex>
			}
		>
			<RichTextEditorInternalWithInternalState {...props} />
		</Suspense>
	);
};

export default RichTextEditorWithInternalState;
