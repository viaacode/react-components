import { type FunctionComponent, lazy, Suspense } from 'react';

import { Flex } from '../Flex/Flex.js';

import type { RichTextEditorProps } from './RichTextEditor.types.js';

/**
 * @deprecated Use RichTextEditorInternalWithInternalState instead since the full editor state isn't exposed, which should be more performant
 */
const RichTextEditorInternal = lazy(() => import('./RichTextEditorInternal.js'));

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
			<RichTextEditorInternal {...props} />
		</Suspense>
	);
};

export default RichTextEditor;
