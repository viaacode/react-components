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
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import type { ChangeEvent, FunctionComponent, ReactNode } from 'react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import AlignCenterIcon from './icons/align-center.svg?react';
import AlignJustifyIcon from './icons/align-justify.svg?react';
import AlignLeftIcon from './icons/align-left.svg?react';
import AlignRightIcon from './icons/align-right.svg?react';
import BoldIcon from './icons/bold.svg?react';
import FullscreenIcon from './icons/fullscreen.svg?react';
import FullscreenCloseIcon from './icons/fullscreen-close.svg?react';
import HrIcon from './icons/hr.svg?react';
import ImageIcon from './icons/image.svg?react';
import ItalicIcon from './icons/italic.svg?react';
import ListNumericIcon from './icons/list-numeric.svg?react';
import ListUnorderedIcon from './icons/list-unordered.svg?react';
import RedoIcon from './icons/redo.svg?react';
import RemoveStylesIcon from './icons/remove-styles.svg?react';
import StrikeThroughIcon from './icons/strike-through.svg?react';
import SubscriptIcon from './icons/subscript.svg?react';
import SuperscriptIcon from './icons/superscript.svg?react';
import TableIcon from './icons/table.svg?react';
import UnderlineIcon from './icons/underline.svg?react';
import UndoIcon from './icons/undo.svg?react';
import UnlinkIcon from './icons/unlink.svg?react';
import { prettifyHtml } from './RichTextEditor.helpers';
import {
	ALL_RICH_TEXT_HEADINGS,
	type Heading,
	type RichTextEditorControl,
	type RichTextEditorMedia,
	type RichTextEditorUploadInfo,
} from './RichTextEditor.types';

import './RichTextEditor.scss';
import { RichTextEditorLinkDropdown } from './components/LinkControl/RichTextEditorLinkDropdown';

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
	'strike-through',
	'underline',
	'separator',
	'text-align',
	'separator',
	'list-ul',
	'list-ol',
	'separator',
	'subscript',
	'superscript',
	'separator',
	'hr',
	'separator',
	'link',
	'unlink',
	'separator',
	'table',
	'separator',
	'remove-styles',
	'media',
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
	const [overlayTop, setOverlayTop] = useState(0);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const toolbarRef = useRef<HTMLDivElement | null>(null);

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
			setOverlayTop(toolbarHeight);
		};

		updateOverlayTop();

		if (typeof ResizeObserver === 'undefined') {
			return;
		}

		const observer = new ResizeObserver(updateOverlayTop);
		if (toolbarRef.current) {
			observer.observe(toolbarRef.current);
		}

		return () => observer.disconnect();
	}, []);

	const accept = useMemo(() => {
		const accepts = Object.values(media?.accepts || {})
			.filter(Boolean)
			.join(',');
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
					label: <BoldIcon />,
					title: 'Vet',
					onClick: () => editor?.chain().focus().toggleBold().run(),
					isActive: !!editor?.isActive('bold'),
				});
			case 'italic':
				return renderButton({
					key: `italic-${index}`,
					label: <ItalicIcon />,
					title: 'Cursief',
					onClick: () => editor?.chain().focus().toggleItalic().run(),
					isActive: !!editor?.isActive('italic'),
				});
			case 'underline':
				return renderButton({
					key: `underline-${index}`,
					label: <UnderlineIcon />,
					title: 'Onderlijnen',
					onClick: () => editor?.chain().focus().toggleUnderline().run(),
					isActive: !!editor?.isActive('underline'),
				});
			case 'strike-through':
				return renderButton({
					key: `strike-${index}`,
					label: <StrikeThroughIcon />,
					title: 'Doorhalen',
					onClick: () => editor?.chain().focus().toggleStrike().run(),
					isActive: !!editor?.isActive('strike'),
				});
			case 'subscript':
				return renderButton({
					key: `subscript-${index}`,
					label: <SubscriptIcon />,
					title: 'Subscript',
					onClick: () => editor?.chain().focus().toggleSubscript().run(),
					isActive: !!editor?.isActive('subscript'),
				});
			case 'superscript':
				return renderButton({
					key: `superscript-${index}`,
					label: <SuperscriptIcon />,
					title: 'Superscript',
					onClick: () => editor?.chain().focus().toggleSuperscript().run(),
					isActive: !!editor?.isActive('superscript'),
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
								.setHeading({
									level: Number.parseInt(nextHeading.replace('h', ''), 10) as 1 | 2 | 3 | 4 | 5 | 6,
								})
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
					label: <ListUnorderedIcon />,
					title: 'Ongeordende lijst',
					onClick: () => editor?.chain().focus().toggleBulletList().run(),
					isActive: !!editor?.isActive('bulletList'),
				});
			case 'list-ol':
				return renderButton({
					key: `list-ol-${index}`,
					label: <ListNumericIcon />,
					title: 'Geordende lijst',
					onClick: () => editor?.chain().focus().toggleOrderedList().run(),
					isActive: !!editor?.isActive('orderedList'),
				});
			case 'hr':
				return renderButton({
					key: `hr-${index}`,
					label: <HrIcon />,
					title: 'Horizontale lijn',
					onClick: () => editor?.chain().focus().setHorizontalRule().run(),
				});
			case 'link':
				return (
					<RichTextEditorLinkDropdown
						key={`link-${index}`}
						editor={editor}
						root={root}
						isDisabled={areToolbarActionsDisabled}
					/>
				);
			case 'unlink':
				return renderButton({
					key: `unlink-${index}`,
					label: <UnlinkIcon />,
					title: 'Link verwijderen',
					onClick: () => editor?.chain().focus().unsetLink().run(),
					isDisabled: areToolbarActionsDisabled || !editor?.isActive('link'),
				});
			case 'media':
				return renderButton({
					key: `media-${index}`,
					label: <ImageIcon />,
					title: 'Afbeelding toevoegen',
					onClick: () => fileInputRef.current?.click(),
					isDisabled: areToolbarActionsDisabled || !media,
				});
			case 'table':
				return renderButton({
					key: `table-${index}`,
					label: <TableIcon />,
					title: 'Tabel invoegen',
					onClick: () =>
						editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
					isActive: !!editor?.isActive('table'),
				});
			case 'text-align':
				return [
					renderButton({
						key: `align-left-${index}`,
						label: <AlignLeftIcon />,
						title: 'Links uitlijnen',
						onClick: () => editor?.chain().focus().setTextAlign('left').run(),
						isActive: isLeftAligned,
					}),
					renderButton({
						key: `align-center-${index}`,
						label: <AlignCenterIcon />,
						title: 'Centreren',
						onClick: () => editor?.chain().focus().setTextAlign('center').run(),
						isActive: isCentered,
					}),
					renderButton({
						key: `align-right-${index}`,
						label: <AlignRightIcon />,
						title: 'Rechts uitlijnen',
						onClick: () => editor?.chain().focus().setTextAlign('right').run(),
						isActive: isRightAligned,
					}),
					renderButton({
						key: `align-justify-${index}`,
						label: <AlignJustifyIcon />,
						title: 'Uitvullen',
						onClick: () => editor?.chain().focus().setTextAlign('justify').run(),
						isActive: isJustified,
					}),
				];
			case 'undo':
				return renderButton({
					key: `undo-${index}`,
					label: <UndoIcon />,
					title: 'Ongedaan maken',
					onClick: () => editor?.chain().focus().undo().run(),
					isDisabled: areToolbarActionsDisabled || !canUndo,
				});
			case 'redo':
				return renderButton({
					key: `redo-${index}`,
					label: <RedoIcon />,
					title: 'Opnieuw uitvoeren',
					onClick: () => editor?.chain().focus().redo().run(),
					isDisabled: areToolbarActionsDisabled || !canRedo,
				});
			case 'fullscreen':
				return renderButton({
					key: `fullscreen-${index}`,
					label: isFullscreen ? <FullscreenCloseIcon /> : <FullscreenIcon />,
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
			case 'remove-styles':
				return renderButton({
					key: `remove-styles-${index}`,
					label: <RemoveStylesIcon />,
					title: 'Verwijder stijlen',
					onClick: () => editor?.chain().focus().clearNodes().unsetAllMarks().run(),
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
