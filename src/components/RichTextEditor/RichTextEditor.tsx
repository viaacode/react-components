import React, { FunctionComponent, Suspense } from 'react';

import { Flex } from '../Flex/Flex';

import { RichTextEditorPropsSchema } from './RichTextEditor.types';

const RichTextEditorInternal = React.lazy(() => import('./RichTextEditorInternal'));

export const RichTextEditor: FunctionComponent<RichTextEditorPropsSchema> = (props) => {
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
