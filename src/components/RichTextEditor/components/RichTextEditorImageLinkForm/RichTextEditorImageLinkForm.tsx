import type { Editor } from '@tiptap/react';
import clsx from 'clsx';
import { type FunctionComponent, type KeyboardEvent, useEffect, useRef, useState } from 'react';
import CrossIcon from '../../icons/cross.svg?react';
import { LabelKey, type RichTextEditorLabels } from '../../RichTextEditor.labels';

interface RichTextEditorImageLinkFormProps {
	editor: Editor;
	root: string;
	labels: RichTextEditorLabels;
	onClose: () => void;
}

/**
 * Edits the link of the selected image: its url and whether it opens in a new window.
 * Used both in the link dropdown of the toolbar and in the bubble menu of the image.
 *
 * The link is stored on the image node (see RichTextEditorImage), so updating it never touches
 * the other attributes of the image, like its alignment or size.
 */
export const RichTextEditorImageLinkForm: FunctionComponent<RichTextEditorImageLinkFormProps> = ({
	editor,
	root,
	labels,
	onClose,
}) => {
	const [linkUrl, setLinkUrl] = useState<string>(
		() => (editor.getAttributes('image').href as string | null) || ''
	);
	const [openInNewTab, setOpenInNewTab] = useState<boolean>(
		() => editor.getAttributes('image').target === '_blank'
	);
	const urlInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		urlInputRef.current?.focus({ preventScroll: true });
	}, []);

	const applyLink = () => {
		const href = linkUrl.trim();

		if (href) {
			editor
				.chain()
				.focus()
				.setImageLink({ href, target: openInNewTab ? '_blank' : '_self' })
				.run();
		} else {
			editor.chain().focus().unsetImageLink().run();
		}
		onClose();
	};

	const removeLink = () => {
		editor.chain().focus().unsetImageLink().run();
		onClose();
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			applyLink();
		} else if (e.key === 'Escape') {
			e.preventDefault();
			onClose();
		}
	};

	return (
		<>
			<input
				ref={urlInputRef}
				type="url"
				value={linkUrl}
				onChange={(e) => setLinkUrl(e.target.value)}
				placeholder={labels[LabelKey.Link_InsertLinkUrl]}
				onKeyDown={handleKeyDown}
			/>
			<div
				className={`${root}__link-popup-toggle`}
				onClick={() => setOpenInNewTab((prev) => !prev)}
				onKeyDown={(e) => {
					if (e.key === ' ' || e.key === 'Enter') {
						e.preventDefault();
						setOpenInNewTab((prev) => !prev);
					}
				}}
				role="switch"
				aria-checked={openInNewTab}
				tabIndex={0}
			>
				<span className={clsx(`${root}__link-popup-switch`, { 'is-on': openInNewTab })} />
				{labels[LabelKey.Link_OpenInNewWindow]}
			</div>
			<div className={`${root}__link-popup-footer`}>
				<button type="button" className={`${root}__link-popup-delete`} onClick={removeLink}>
					<CrossIcon />
					{labels[LabelKey.Link_DeleteLink]}
				</button>
				<div>
					<button type="button" onClick={onClose}>
						{labels[LabelKey.Link_Cancel]}
					</button>
					<button type="button" className={`${root}__link-popup-confirm`} onClick={applyLink}>
						{labels[LabelKey.Link_Confirm]}
					</button>
				</div>
			</div>
		</>
	);
};
