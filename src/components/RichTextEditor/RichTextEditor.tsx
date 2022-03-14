import React, { FunctionComponent, Suspense } from 'react';

import { Flex } from '../Flex/Flex';

import { RichTextEditorProps } from './RichTextEditor.types';

const RichTextEditorInternal = React.lazy(() => import('./RichTextEditorInternal'));

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
