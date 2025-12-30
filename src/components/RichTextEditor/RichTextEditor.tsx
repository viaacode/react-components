import { type FC, type FunctionComponent, lazy, Suspense } from 'react';
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
	return (
		<Suspense
			fallback={
				<Flex orientation="horizontal" center>
					<p>Laden...</p>
				</Flex>
			}
		>
			{RichTextEditorInternal && <RichTextEditorInternal {...props} />}
		</Suspense>
	);
};

export default RichTextEditor;
