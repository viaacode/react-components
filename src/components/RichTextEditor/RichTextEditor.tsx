import React, { FunctionComponent, Suspense } from 'react';

import { Flex } from '../Flex/Flex';

import { RichTextEditorProps } from './RichTextEditor.types';

/**
 * @deprecated Use RichTextEditorInternalWithInternalState instead since the full editor state isn't exposed, which should be more performant
 */
const RichTextEditorInternal = React.lazy(() => import('./RichTextEditorInternal'));

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
