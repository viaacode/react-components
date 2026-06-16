import { type FC, type FunctionComponent, useEffect, useState } from 'react';
import { isServerSideRendering } from '../../utils/is-server-side-rendering';
import { Flex } from '../Flex/Flex';
import type { RichTextEditorWithInternalStateProps } from './RichTextEditor.types';

/**
 * The braft-based editor is loaded with a manual dynamic import (instead of React.lazy + Suspense)
 * so that it is only rendered once the chunk is fully resolved. Rendering a Suspense boundary that
 * suspends as a direct result of a discrete user interaction (e.g. clicking inside the editor)
 * triggers React error #426 ("A component suspended while responding to synchronous input").
 */
const RichTextEditorWithInternalState: FunctionComponent<RichTextEditorWithInternalStateProps> = (
	props
) => {
	const [RichTextEditorInternalWithInternalState, setRichTextEditorInternalWithInternalState] =
		useState<FC<RichTextEditorWithInternalStateProps> | null>(null);

	useEffect(() => {
		// Do not load the rich text editor during server side rendering
		// Since it causes ESM/CommonJS issues with braft-editor and doesn't add much to the server side rendering anyway
		if (isServerSideRendering()) return;

		let isMounted = true;
		import('./RichTextEditorInternalWithInternalState.js').then((module) => {
			if (isMounted) {
				setRichTextEditorInternalWithInternalState(() => module.default);
			}
		});

		return () => {
			isMounted = false;
		};
	}, []);

	const renderSpinner = () => (
		<Flex orientation="horizontal" center>
			<p>Laden...</p>
		</Flex>
	);

	if (!RichTextEditorInternalWithInternalState) return renderSpinner();
	return <RichTextEditorInternalWithInternalState {...props} />;
};

export default RichTextEditorWithInternalState;
