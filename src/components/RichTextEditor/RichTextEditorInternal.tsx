import clsx from 'clsx';
import type {
	ChangeEvent,
	FunctionComponent,
	KeyboardEvent as ReactKeyboardEvent,
	ReactNode,
} from 'react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { Table } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';

import { prettifyHtml } from './RichTextEditor.helpers';
import {
	ALL_RICH_TEXT_HEADINGS,
	type Heading,
	type RichTextEditorControl,
	type RichTextEditorMedia,
	type RichTextEditorUploadInfo,
} from './RichTextEditor.types';

import './RichTextEditor.scss';

const DEFAULT_CONTROLS: RichTextEditorControl[] = [
	'fullscreen',
	'separator',
	'undo',
	'redo',
	'separator',
	'headings',
	'separator',
	'bold',
	'italic',
	'underline',
	'strike-through',
	'separator',
	'link',
	'separator',
	'list-ul',
	'list-ol',
	'blockquote',
	'code',
	'hr',
	'text-align',
	'remove-styles',
];

interface RichTextEditorInternalProps {
	children?: ReactNode;
	className?: string;
	rootClassName?: string;
	id?: string;
	value?: string;
	placeholder?: string;
	controls?: RichTextEditorControl[];
	disabled?: boolean;
	media?: RichTextEditorMedia;
	onFocus?: () => void;
	onBlur?: () => void;
	onChange?: (html: string) => void;
	onTab?: () => void;
	onDelete?: () => void;
	onSave?: () => void;
	enabledHeadings?: Heading[];
}

const RichTextEditorInternal: FunctionComponent<RichTextEditorInternalProps> = ({
	className,
	controls,
	disabled,
	id,
	value,
	media,
	onBlur,
	onChange,
	onDelete,
	onFocus,
	onSave,
	onTab,
	placeholder,
	enabledHeadings,
	rootClassName: root = 'c-rich-text-editor',
}: RichTextEditorInternalProps) => {
	const resolvedControls = controls ?? DEFAULT_CONTROLS;
	const resolvedHeadings =
		enabledHeadings && enabledHeadings.length > 0 ? enabledHeadings : ALL_RICH_TEXT_HEADINGS;
	const [isHtmlView, setIsHtmlView] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [prettyHtml, setPrettyHtml] = useState(prettifyHtml(value || ''));
	const [showLinkInput, setShowLinkInput] = useState(false);
	const [linkUrl, setLinkUrl] = useState('');
	const [overlayTop, setOverlayTop] = useState(0);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const toolbarRef = useRef<HTMLDivElement | null>(null);
	const linkInputRef = useRef<HTMLDivElement | null>(null);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link.configure({ openOnClick: false }),
			Image.configure({ HTMLAttributes: { class: 'c-editor-image' } }),
			Table.configure({
				resizable: false,
				HTMLAttributes: { class: 'c-editor-table' },
			}),
			TableRow,
			TableCell,
			TableHeader,
			Subscript,
			Superscript,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			TextStyle,
			Placeholder.configure({ placeholder }),
		],
		content: value || '',
		editable: !disabled,
		immediatelyRender: false,
		editorProps: {
			handleKeyDown: (_view, event) => {
				if (event.key === 'Tab') {
					onTab?.();
				}

				if (event.key === 'Backspace' || event.key === 'Delete') {
					onDelete?.();
				}

				if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
					event.preventDefault();
					onSave?.();
				}

				return false;
			},
		},
		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			onChange?.(html);
			setPrettyHtml(prettifyHtml(html));
		},
		onBlur: () => onBlur?.(),
		onFocus: () => onFocus?.(),
	});

	useEffect(() => {
		if (editor && value !== undefined && editor.getHTML() !== value) {
			editor.commands.setContent(value || '', { emitUpdate: false });
		}
	}, [editor, value]);

	useEffect(() => {
		setPrettyHtml(prettifyHtml(value || ''));
	}, [value]);

	useEffect(() => {
		if (editor) {
			editor.setEditable(!disabled);
		}
	}, [disabled, editor]);

	useLayoutEffect(() => {
		const updateOverlayTop = () => {
			const toolbarHeight = toolbarRef.current?.getBoundingClientRect().height || 0;
			const linkHeight = showLinkInput
				? linkInputRef.current?.getBoundingClientRect().height || 0
				: 0;
			setOverlayTop(toolbarHeight + linkHeight);
		};

		updateOverlayTop();

		if (typeof ResizeObserver === 'undefined') {
			return;
		}

		const observer = new ResizeObserver(updateOverlayTop);
		if (toolbarRef.current) {
			observer.observe(toolbarRef.current);
		}
		if (linkInputRef.current) {
			observer.observe(linkInputRef.current);
		}

		return () => observer.disconnect();
	}, [showLinkInput]);

	const accept = useMemo(() => {
		const accepts = Object.values(media?.accepts || {}).filter(Boolean).join(',');
		return accepts || 'image/*';
	}, [media?.accepts]);

	const isEditorReady = !!editor;
	const areToolbarActionsDisabled = disabled || isHtmlView || !isEditorReady;
	const isCentered = !!editor?.isActive({ textAlign: 'center' });
	const isRightAligned = !!editor?.isActive({ textAlign: 'right' });
	const isJustified = !!editor?.isActive({ textAlign: 'justify' });
	const isLeftAligned = !!editor && !isCentered && !isRightAligned && !isJustified;
	const canUndo = !!editor?.can().chain().focus().undo().run();
	const canRedo = !!editor?.can().chain().focus().redo().run();

	const getActiveHeading = (): Heading => {
		if (editor?.isActive('heading', { level: 1 })) return 'h1';
		if (editor?.isActive('heading', { level: 2 })) return 'h2';
		if (editor?.isActive('heading', { level: 3 })) return 'h3';
		if (editor?.isActive('heading', { level: 4 })) return 'h4';
		if (editor?.isActive('heading', { level: 5 })) return 'h5';
		if (editor?.isActive('heading', { level: 6 })) return 'h6';
		return 'normal';
	};

	const handleHtmlBlur = () => {
		if (!editor) {
			return;
		}

		editor.commands.setContent(prettyHtml || '', { emitUpdate: false });
		const html = editor.getHTML();
		setPrettyHtml(prettifyHtml(html));
		onChange?.(html);
	};

	const toggleHtmlView = () => {
		if (isHtmlView) {
			handleHtmlBlur();
		} else {
			setPrettyHtml(prettifyHtml(editor?.getHTML() || value || ''));
		}
		setIsHtmlView((prev) => !prev);
	};

	const openLinkInput = () => {
		setLinkUrl((editor?.getAttributes('link').href as string) || '');
		setShowLinkInput(true);
	};

	const applyLink = () => {
		if (!editor) {
			return;
		}

		const href = linkUrl.trim();
		if (!href) {
			editor.chain().focus().unsetLink().run();
		} else {
			editor.chain().focus().extendMarkRange('link').setLink({ href, target: '_blank' }).run();
		}
		setShowLinkInput(false);
	};

	const handleLinkInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			applyLink();
		}
		if (event.key === 'Escape') {
			event.preventDefault();
			setShowLinkInput(false);
		}
	};

	const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		event.target.value = '';

		if (!file || !editor || !media) {
			return;
		}

		try {
			const isValid = (await media.validateFn?.(file)) ?? true;
			if (!isValid) {
				return;
			}

			const uploadInfo: RichTextEditorUploadInfo = {
				file,
				progress: () => undefined,
				libraryId: '',
				success: (res) => {
					editor.chain().focus().setImage({ src: res.url }).run();
				},
				error: (error) => {
					console.error(error);
				},
			};

			media.uploadFn(uploadInfo);
		} catch (error) {
			console.error(error);
		}
	};

	const renderButton = ({
		key,
		label,
		title,
		onClick,
		isActive = false,
		isDisabled = areToolbarActionsDisabled,
	}: {
		key: string;
		label: ReactNode;
		title: string;
		onClick: () => void;
		isActive?: boolean;
		isDisabled?: boolean;
	}) => (
		<button
			type="button"
			key={key}
			className={isActive ? 'is-active' : undefined}
			onClick={onClick}
			title={title}
			disabled={isDisabled}
		>
			{label}
		</button>
	);

	const renderControl = (control: RichTextEditorControl, index: number) => {
		if (typeof control !== 'string') {
			return (
				<div className={`${root}__custom-button`} key={`custom-${index}`}>
					{control.component}
				</div>
			);
		}

		switch (control) {
			case 'separator':
				return <div className={`${root}__separator`} key={`separator-${index}`} />;
			case 'bold':
				return renderButton({
					key: `bold-${index}`,
					label: <strong>B</strong>,
					title: 'Vet',
					onClick: () => editor?.chain().focus().toggleBold().run(),
					isActive: !!editor?.isActive('bold'),
				});
			case 'italic':
				return renderButton({
					key: `italic-${index}`,
					label: <em>I</em>,
					title: 'Cursief',
					onClick: () => editor?.chain().focus().toggleItalic().run(),
					isActive: !!editor?.isActive('italic'),
				});
			case 'underline':
				return renderButton({
					key: `underline-${index}`,
					label: <u>U</u>,
					title: 'Onderlijnen',
					onClick: () => editor?.chain().focus().toggleUnderline().run(),
					isActive: !!editor?.isActive('underline'),
				});
			case 'strike-through':
				return renderButton({
					key: `strike-${index}`,
					label: <s>S</s>,
					title: 'Doorhalen',
					onClick: () => editor?.chain().focus().toggleStrike().run(),
					isActive: !!editor?.isActive('strike'),
				});
			case 'subscript':
				return renderButton({
					key: `subscript-${index}`,
					label: 'X₂',
					title: 'Subscript',
					onClick: () => editor?.chain().focus().toggleSubscript().run(),
					isActive: !!editor?.isActive('subscript'),
				});
			case 'superscript':
				return renderButton({
					key: `superscript-${index}`,
					label: 'X²',
					title: 'Superscript',
					onClick: () => editor?.chain().focus().toggleSuperscript().run(),
					isActive: !!editor?.isActive('superscript'),
				});
			case 'remove-styles':
				return renderButton({
					key: `remove-styles-${index}`,
					label: 'Tx',
					title: 'Verwijder stijlen',
					onClick: () => editor?.chain().focus().clearNodes().unsetAllMarks().run(),
				});
			case 'headings':
				return (
					<select
						key={`headings-${index}`}
						onChange={(event) => {
							const nextHeading = event.target.value;
							if (!editor) {
								return;
							}
							if (nextHeading === 'normal') {
								editor.chain().focus().setParagraph().run();
								return;
							}
							editor
								.chain()
								.focus()
								.setHeading({ level: Number.parseInt(nextHeading.replace('h', ''), 10) as 1 | 2 | 3 | 4 | 5 | 6 })
								.run();
						}}
						value={getActiveHeading()}
						disabled={areToolbarActionsDisabled}
					>
						{resolvedHeadings.includes('h1') && <option value="h1">Koptekst 1</option>}
						{resolvedHeadings.includes('h2') && <option value="h2">Koptekst 2</option>}
						{resolvedHeadings.includes('h3') && <option value="h3">Koptekst 3</option>}
						{resolvedHeadings.includes('h4') && <option value="h4">Koptekst 4</option>}
						{resolvedHeadings.includes('h5') && <option value="h5">Koptekst 5</option>}
						{resolvedHeadings.includes('h6') && <option value="h6">Koptekst 6</option>}
						{resolvedHeadings.includes('normal') && <option value="normal">Normaal</option>}
					</select>
				);
			case 'list-ul':
				return renderButton({
					key: `list-ul-${index}`,
					label: '•',
					title: 'Ongeordende lijst',
					onClick: () => editor?.chain().focus().toggleBulletList().run(),
					isActive: !!editor?.isActive('bulletList'),
				});
			case 'list-ol':
				return renderButton({
					key: `list-ol-${index}`,
					label: '1.',
					title: 'Geordende lijst',
					onClick: () => editor?.chain().focus().toggleOrderedList().run(),
					isActive: !!editor?.isActive('orderedList'),
				});
			case 'blockquote':
				return renderButton({
					key: `blockquote-${index}`,
					label: '❝',
					title: 'Citaat',
					onClick: () => editor?.chain().focus().toggleBlockquote().run(),
					isActive: !!editor?.isActive('blockquote'),
				});
			case 'code':
				return renderButton({
					key: `code-${index}`,
					label: '</>',
					title: 'Code',
					onClick: () => editor?.chain().focus().toggleCode().run(),
					isActive: !!editor?.isActive('code'),
				});
			case 'hr':
				return renderButton({
					key: `hr-${index}`,
					label: '—',
					title: 'Horizontale lijn',
					onClick: () => editor?.chain().focus().setHorizontalRule().run(),
				});
			case 'link':
				return renderButton({
					key: `link-${index}`,
					label: 'Link',
					title: 'Link invoegen',
					onClick: openLinkInput,
					isActive: !!editor?.isActive('link') || showLinkInput,
				});
			case 'media':
				return renderButton({
					key: `media-${index}`,
					label: 'Media',
					title: 'Afbeelding toevoegen',
					onClick: () => fileInputRef.current?.click(),
					isDisabled: areToolbarActionsDisabled || !media,
				});
			case 'table':
				return renderButton({
					key: `table-${index}`,
					label: 'Tabel',
					title: 'Tabel invoegen',
					onClick: () =>
						editor
							?.chain()
							.focus()
							.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
							.run(),
					isActive: !!editor?.isActive('table'),
				});
			case 'text-align':
				return [
					renderButton({
						key: `align-left-${index}`,
						label: 'L',
						title: 'Links uitlijnen',
						onClick: () => editor?.chain().focus().setTextAlign('left').run(),
						isActive: isLeftAligned,
					}),
					renderButton({
						key: `align-center-${index}`,
						label: 'C',
						title: 'Centreren',
						onClick: () => editor?.chain().focus().setTextAlign('center').run(),
						isActive: isCentered,
					}),
					renderButton({
						key: `align-right-${index}`,
						label: 'R',
						title: 'Rechts uitlijnen',
						onClick: () => editor?.chain().focus().setTextAlign('right').run(),
						isActive: isRightAligned,
					}),
					renderButton({
						key: `align-justify-${index}`,
						label: 'J',
						title: 'Uitvullen',
						onClick: () => editor?.chain().focus().setTextAlign('justify').run(),
						isActive: isJustified,
					}),
				];
			case 'undo':
				return renderButton({
					key: `undo-${index}`,
					label: '↶',
					title: 'Ongedaan maken',
					onClick: () => editor?.chain().focus().undo().run(),
					isDisabled: areToolbarActionsDisabled || !canUndo,
				});
			case 'redo':
				return renderButton({
					key: `redo-${index}`,
					label: '↷',
					title: 'Opnieuw uitvoeren',
					onClick: () => editor?.chain().focus().redo().run(),
					isDisabled: areToolbarActionsDisabled || !canRedo,
				});
			case 'fullscreen':
				return renderButton({
					key: `fullscreen-${index}`,
					label: '⛶',
					title: 'Volledig scherm',
					onClick: () => setIsFullscreen((prev) => !prev),
					isActive: isFullscreen,
					isDisabled: !isEditorReady,
				});
			case 'editHtml':
				return renderButton({
					key: `edit-html-${index}`,
					label: 'HTML',
					title: 'HTML bewerken',
					onClick: toggleHtmlView,
					isActive: isHtmlView,
					isDisabled: !isEditorReady,
				});
			case 'clear':
				return renderButton({
					key: `clear-${index}`,
					label: 'Wis',
					title: 'Inhoud wissen',
					onClick: () => editor?.chain().focus().clearContent().run(),
				});
			default:
				return null;
		}
	};

	return (
		<div
			className={clsx(root, className, {
				disabled,
				'is-fullscreen': isFullscreen,
			})}
			id={id}
		>
			<div className={`${root}__toolbar`} ref={toolbarRef}>
				{resolvedControls.map((control, index) => renderControl(control, index))}
				{resolvedControls.includes('table') && editor?.isActive('table') ? (
					<>
						<div className={`${root}__separator`} />
						{renderButton({
							key: 'table-add-row',
							label: 'Voeg rij in',
							title: 'Voeg rij in',
							onClick: () => editor.chain().focus().addRowAfter().run(),
						})}
						{renderButton({
							key: 'table-delete-row',
							label: 'Verwijder rij',
							title: 'Verwijder rij',
							onClick: () => editor.chain().focus().deleteRow().run(),
						})}
						{renderButton({
							key: 'table-add-column',
							label: 'Voeg kolom in',
							title: 'Voeg kolom in',
							onClick: () => editor.chain().focus().addColumnAfter().run(),
						})}
						{renderButton({
							key: 'table-delete-column',
							label: 'Verwijder kolom',
							title: 'Verwijder kolom',
							onClick: () => editor.chain().focus().deleteColumn().run(),
						})}
						{renderButton({
							key: 'table-delete',
							label: 'Verwijder tabel',
							title: 'Verwijder tabel',
							onClick: () => editor.chain().focus().deleteTable().run(),
						})}
					</>
				) : null}
			</div>
			{showLinkInput && (
				<div className={`${root}__link-input`} ref={linkInputRef}>
					<input
						type="url"
						value={linkUrl}
						onChange={(event) => setLinkUrl(event.target.value)}
						onKeyDown={handleLinkInputKeyDown}
						placeholder="https://voorbeeld.be"
					/>
					<button type="button" onClick={applyLink}>
						OK
					</button>
					<button type="button" onClick={() => setShowLinkInput(false)}>
						Annuleer
					</button>
				</div>
			)}
			<EditorContent editor={editor} className={`${root}__content`} />
			{isHtmlView && (
				<textarea
					className={`${root}__html-view`}
					style={{
						top: `${overlayTop}px`,
						height: `calc(100% - ${overlayTop}px)`,
					}}
					value={prettyHtml}
					onChange={(event) => setPrettyHtml(event.target.value)}
					onBlur={handleHtmlBlur}
				/>
			)}
			{media ? (
				<input
					type="file"
					ref={fileInputRef}
					style={{ display: 'none' }}
					accept={accept}
					onChange={handleFileSelect}
				/>
			) : null}
		</div>
	);
};

export default RichTextEditorInternal;
