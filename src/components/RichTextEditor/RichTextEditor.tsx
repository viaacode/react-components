import { type FC, type FunctionComponent, lazy, Suspense, useEffect, useState } from 'react';
import { isServerSideRendering } from '../../utils/is-server-side-rendering';
import { Flex } from '../Flex/Flex';
import type { RichTextEditorProps } from './RichTextEditor.types';

/**
 * @deprecated Use RichTextEditorInternalWithInternalState instead since the full editor state isn't exposed, which should be more performant
 */
let RichTextEditorInternal: FC<RichTextEditorProps> | null = null;
if (!isServerSideRendering()) {
	// Do not load the rich text editor during server side rendering
	// Since it causes ESM/CcommonJS issues with braft-editor and doesn't add much to the server side rendering anyway
	RichTextEditorInternal = lazy(() => import('./RichTextEditorInternal.js'));
}

/**
 * @deprecated Use RichTextEditorWithInternalState instead since the full editor state isn't exposed, which should be more performant
 */
const RichTextEditor: FunctionComponent<RichTextEditorProps> = (props) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const renderSpinner = () => (
		<Flex orientation="horizontal" center>
			<p>Laden...</p>
		</Flex>
	);

	if (!mounted) return renderSpinner();
	return (
		<Suspense fallback={renderSpinner()}>
			{RichTextEditorInternal && <RichTextEditorInternal {...props} />}
		</Suspense>
	);
};

export default RichTextEditor;
