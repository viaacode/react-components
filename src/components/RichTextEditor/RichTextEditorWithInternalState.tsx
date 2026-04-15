import { type FC, type FunctionComponent, lazy, Suspense, useEffect, useState } from 'react';
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
			{!!RichTextEditorInternalWithInternalState && (
				<RichTextEditorInternalWithInternalState {...props} />
			)}
		</Suspense>
	);
};

export default RichTextEditorWithInternalState;
