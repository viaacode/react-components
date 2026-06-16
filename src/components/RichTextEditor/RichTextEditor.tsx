import { type FC, type FunctionComponent, useEffect, useState } from 'react';
import { isServerSideRendering } from '../../utils/is-server-side-rendering';
import { Flex } from '../Flex/Flex';
import type { RichTextEditorProps } from './RichTextEditor.types';

/**
 * @deprecated Use RichTextEditorWithInternalState instead since the full editor state isn't exposed, which should be more performant
 *
 * The braft-based editor is loaded with a manual dynamic import (instead of React.lazy + Suspense)
 * so that it is only rendered once the chunk is fully resolved. Rendering a Suspense boundary that
 * suspends as a direct result of a discrete user interaction (e.g. clicking inside the editor)
 * triggers React error #426 ("A component suspended while responding to synchronous input").
 */
const RichTextEditor: FunctionComponent<RichTextEditorProps> = (props) => {
	const [RichTextEditorInternal, setRichTextEditorInternal] =
		useState<FC<RichTextEditorProps> | null>(null);

	useEffect(() => {
		// Do not load the rich text editor during server side rendering
		// Since it causes ESM/CommonJS issues with braft-editor and doesn't add much to the server side rendering anyway
		if (isServerSideRendering()) return;

		let isMounted = true;
		import('./RichTextEditorInternal.js').then((module) => {
			if (isMounted) {
				setRichTextEditorInternal(() => module.default);
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

	if (!RichTextEditorInternal) return renderSpinner();
	return <RichTextEditorInternal {...props} />;
};

export default RichTextEditor;
