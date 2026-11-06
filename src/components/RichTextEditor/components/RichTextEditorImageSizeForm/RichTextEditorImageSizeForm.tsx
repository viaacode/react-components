import type { Editor } from '@tiptap/react';
import {
	type FunctionComponent,
	type KeyboardEvent,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { parseImageSize, type RichTextEditorImageSize } from '../../extensions/RichTextEditorImage';
import { LabelKey, type RichTextEditorLabels } from '../../RichTextEditor.labels';

interface RichTextEditorImageSizeFormProps {
	editor: Editor;
	root: string;
	labels: RichTextEditorLabels;
	onClose: () => void;
}

const sizeToInputValue = (size: RichTextEditorImageSize | undefined): string =>
	size === null || size === undefined ? '' : String(size);

/**
 * The image element of the selected image node, which is wrapped in an anchor when it is linked.
 */
const getSelectedImageElement = (editor: Editor): HTMLImageElement | null => {
	const dom = editor.view.nodeDOM(editor.state.selection.from);

	if (dom instanceof HTMLImageElement) {
		return dom;
	}
	return dom instanceof HTMLElement ? dom.querySelector('img') : null;
};

/**
 * Sets the width and height of the selected image, in pixels or as a percentage. Leaving a field
 * empty keeps that dimension automatic. As long as both are given in pixels, the aspect ratio of
 * the image is kept: changing one dimension updates the other.
 */
export const RichTextEditorImageSizeForm: FunctionComponent<RichTextEditorImageSizeFormProps> = ({
	editor,
	root,
	labels,
	onClose,
}) => {
	const [width, setWidth] = useState<string>(() =>
		sizeToInputValue(editor.getAttributes('image').width)
	);
	const [height, setHeight] = useState<string>(() =>
		sizeToInputValue(editor.getAttributes('image').height)
	);
	const widthInputRef = useRef<HTMLInputElement>(null);

	const naturalSize = useMemo(() => {
		const image = getSelectedImageElement(editor);
		return image?.naturalWidth && image.naturalHeight
			? { width: image.naturalWidth, height: image.naturalHeight }
			: null;
	}, [editor]);

	useEffect(() => {
		widthInputRef.current?.focus({ preventScroll: true });
	}, []);

	const updateWidth = (value: string) => {
		setWidth(value);
		const pixels = parseImageSize(value);
		if (naturalSize && typeof pixels === 'number') {
			setHeight(String(Math.round((pixels * naturalSize.height) / naturalSize.width)));
		}
	};

	const updateHeight = (value: string) => {
		setHeight(value);
		const pixels = parseImageSize(value);
		if (naturalSize && typeof pixels === 'number') {
			setWidth(String(Math.round((pixels * naturalSize.width) / naturalSize.height)));
		}
	};

	const applySize = () => {
		editor
			.chain()
			.focus()
			.setImageSize({ width: parseImageSize(width), height: parseImageSize(height) })
			.run();
		onClose();
	};

	const resetSize = () => {
		editor.chain().focus().setImageSize({ width: null, height: null }).run();
		onClose();
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			applySize();
		} else if (e.key === 'Escape') {
			e.preventDefault();
			onClose();
		}
	};

	return (
		<>
			<div className={`${root}__image-size-fields`}>
				<label>
					{labels[LabelKey.Image_Width]}
					<input
						ref={widthInputRef}
						type="text"
						inputMode="numeric"
						value={width}
						onChange={(e) => updateWidth(e.target.value)}
						placeholder={naturalSize ? String(naturalSize.width) : 'auto'}
						onKeyDown={handleKeyDown}
					/>
				</label>
				<label>
					{labels[LabelKey.Image_Height]}
					<input
						type="text"
						inputMode="numeric"
						value={height}
						onChange={(e) => updateHeight(e.target.value)}
						placeholder={naturalSize ? String(naturalSize.height) : 'auto'}
						onKeyDown={handleKeyDown}
					/>
				</label>
			</div>
			<div className={`${root}__link-popup-footer`}>
				<button type="button" className={`${root}__link-popup-delete`} onClick={resetSize}>
					{labels[LabelKey.Image_OriginalSize]}
				</button>
				<div>
					<button type="button" onClick={onClose}>
						{labels[LabelKey.Link_Cancel]}
					</button>
					<button type="button" className={`${root}__link-popup-confirm`} onClick={applySize}>
						{labels[LabelKey.Link_Confirm]}
					</button>
				</div>
			</div>
		</>
	);
};
