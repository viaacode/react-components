import { type FC, type FunctionComponent, lazy, Suspense } from 'react';
import { isServerSideRendering } from '../../utils/is-server-side-rendering';
import { Flex } from '../Flex/Flex';
import type { RichTextEditorWithInternalStateProps } from './RichTextEditor.types';

let RichTextEditorInternalWithInternalState: FC<RichTextEditorWithInternalStateProps> | null = null;
if (!isServerSideRendering()) {
	// Do not load the rich text editor during server side rendering
	// Since it causes ESM/CcommonJS issues with braft-editor and doesn't add much to the server side rendering anyway
	RichTextEditorInternalWithInternalState = lazy(
		() => import('./RichTextEditorInternalWithInternalState.js')
	);
}

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
			{!!RichTextEditorInternalWithInternalState && (
				<RichTextEditorInternalWithInternalState {...props} />
			)}
		</Suspense>
	);
};

export default RichTextEditorWithInternalState;
