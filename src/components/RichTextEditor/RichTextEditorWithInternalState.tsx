import React, { type FunctionComponent, Suspense } from 'react';

import { Flex } from '../Flex/Flex';

import type { RichTextEditorWithInternalStateProps } from './RichTextEditor.types';

const RichTextEditorInternalWithInternalState = React.lazy(
	() => import('./RichTextEditorInternalWithInternalState')
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
