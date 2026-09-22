import {
	FloatingPortal,
	flip,
	offset,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react';
import type { Editor } from '@tiptap/react';
import clsx from 'clsx';
import { type FunctionComponent, type KeyboardEvent, useRef, useState } from 'react';
import CrossIcon from '../../icons/cross.svg?react';
import LinkIcon from '../../icons/link.svg?react';
import { LabelKey, type RichTextEditorLabels } from '../../RichTextEditor.labels';

interface RichTextEditorLinkDropdownProps {
	editor: Editor | null;
	root: string;
	isDisabled: boolean;
	labels: RichTextEditorLabels;
}

export const RichTextEditorLinkDropdown: FunctionComponent<RichTextEditorLinkDropdownProps> = ({
	editor,
	root,
	isDisabled,
	labels,
}) => {
	const [open, setOpen] = useState(false);
	const [linkText, setLinkText] = useState('');
	const [linkUrl, setLinkUrl] = useState('');
	const [openInNewTab, setOpenInNewTab] = useState(false);
	const textInputRef = useRef<HTMLInputElement>(null);
	const urlInputRef = useRef<HTMLInputElement>(null);

	// An image carries its link on the node itself rather than as a link mark, so it has no
	// link text to edit: the image is the link content.
	const isImageSelected = !!editor?.isActive('image');

	const { refs, floatingStyles, context } = useFloating({
		open,
		onOpenChange: (nextOpen) => {
			const from = editor?.state.selection.from ?? 0;
			const to = editor?.state.selection.to ?? 0;
			const selectionText = editor?.state.doc.textBetween(from, to) || '';

			if (nextOpen && isImageSelected) {
				setLinkText('');
				setLinkUrl((editor?.getAttributes('image').href as string) || '');
				setOpenInNewTab((editor?.getAttributes('image').target as string) === '_blank');
				setTimeout(() => urlInputRef.current?.focus());
			} else if (nextOpen) {
				const currentNode = editor?.state.doc.nodeAt(from);
				const linkUrl = (editor?.getAttributes('link').href as string) || '';

				setLinkUrl(linkUrl);

				if (linkUrl) {
					setLinkText(selectionText || currentNode?.textContent || '');
				} else {
					// When no url, there is no link component and thus no node content to select (otherwise we would take paragraphs, strong tags etc
					setLinkText(selectionText);
				}

				const target = editor?.getAttributes('link').target as string | undefined;
				setOpenInNewTab(target === '_blank');

				setTimeout(() => {
					if (selectionText) {
						urlInputRef.current?.focus();
					} else {
						textInputRef.current?.focus();
					}
				});
			} else {
				setLinkText(selectionText);
			}
			setOpen(nextOpen);
		},
		middleware: [offset(6), flip(), shift({ padding: 8 })],
		placement: 'bottom',
	});

	const click = useClick(context, { enabled: !isDisabled });
	const dismiss = useDismiss(context);
	const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

	const isActive =
		!!editor?.isActive('link') || (isImageSelected && !!editor?.getAttributes('image').href);

	const applyLink = () => {
		if (!editor) {
			return;
		}
		const href = linkUrl.trim();

		if (isImageSelected) {
			if (href) {
				editor
					.chain()
					.focus()
					.setImageLink({ href, target: openInNewTab ? '_blank' : '_self' })
					.run();
			} else {
				editor.chain().focus().unsetImageLink().run();
			}
			setOpen(false);
			return;
		}

		if (href) {
			// First expand the selection to cover the whole link, so the existing link text
			// gets replaced instead of the new text being inserted next to it
			editor.chain().focus().extendMarkRange('link').run();

			const from = editor.state.selection.from;
			const to = editor.state.selection.to;
			const text = linkText || editor.state.doc.textBetween(from, to) || href;

			editor
				.chain()
				.focus()
				.insertContentAt({ from, to }, `<a href="${href}">${text}</a>`)
				.setLink({ href, target: openInNewTab ? '_blank' : '_self' })
				.run();
		} else {
			editor.chain().focus().unsetLink().run();
		}
		setOpen(false);
	};

	const removeLink = () => {
		if (isImageSelected) {
			editor?.chain().focus().unsetImageLink().run();
		} else {
			editor?.chain().focus().unsetLink().run();
		}
		setOpen(false);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			applyLink();
		} else if (e.key === 'Escape') {
			e.preventDefault();
			setOpen(false);
		}
	};

	return (
		<>
			<button
				ref={refs.setReference}
				type="button"
				className={isActive || open ? 'is-active' : undefined}
				title={labels[LabelKey.Link_InsertLink]}
				disabled={isDisabled}
				{...getReferenceProps()}
			>
				<LinkIcon />
			</button>
			{open && (
				<FloatingPortal>
					<div
						ref={refs.setFloating}
						style={floatingStyles}
						className={`${root}__link-popup`}
						{...getFloatingProps()}
					>
						{!isImageSelected && (
							<input
								ref={textInputRef}
								type="text"
								value={linkText}
								onChange={(e) => setLinkText(e.target.value)}
								placeholder={labels[LabelKey.Link_InsertLinkText]}
								onKeyDown={handleKeyDown}
							/>
						)}
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
								<button type="button" onClick={() => setOpen(false)}>
									{labels[LabelKey.Link_Cancel]}
								</button>
								<button type="button" className={`${root}__link-popup-confirm`} onClick={applyLink}>
									{labels[LabelKey.Link_Confirm]}
								</button>
							</div>
						</div>
					</div>
				</FloatingPortal>
			)}
		</>
	);
};
