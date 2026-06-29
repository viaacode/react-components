import { type FC, type FunctionComponent, useEffect, useState } from 'react';
import { isServerSideRendering } from '../../utils/is-server-side-rendering';
import { Flex } from '../Flex/Flex';
import type { RichTextEditorProps } from './RichTextEditor.types';

/**
 * The rich text editor is loaded with a manual dynamic import (instead of React.lazy + Suspense)
 * so that it is only rendered once the chunk is fully resolved. Rendering a Suspense boundary that
 * suspends as a direct result of a discrete user interaction (e.g. clicking inside the editor)
 * triggers React error #426 ("A component suspended while responding to synchronous input").
 */
export const RichTextEditor: FunctionComponent<RichTextEditorProps> = (props) => {
	const [RichTextEditorInternal, setRichTextEditorInternal] =
		useState<FC<RichTextEditorProps> | null>(null);

	useEffect(() => {
		if (isServerSideRendering()) {
			return;
		}

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

	if (!RichTextEditorInternal) {
		return (
			<Flex orientation="horizontal" center>
				<p>Laden...</p>
			</Flex>
		);
	}

	return <RichTextEditorInternal {...props} />;
};
