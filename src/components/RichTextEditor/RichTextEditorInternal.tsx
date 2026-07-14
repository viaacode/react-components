import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { Table } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import type { ChangeEvent, FunctionComponent, ReactNode } from 'react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { RichTextEditorHeadingsDropdown } from './components/RichTextEditorHeadingsDropdown/RichTextEditorHeadingsDropdown';
import { RichTextEditorLinkDropdown } from './components/RichTextEditorLinkDropdown/RichTextEditorLinkDropdown';
import { RichTextEditorTableDropdown } from './components/RichTextEditorTableDropdown/RichTextEditorTableDropdown';
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
import UnderlineIcon from './icons/underline.svg?react';
import UndoIcon from './icons/undo.svg?react';
import UnlinkIcon from './icons/unlink.svg?react';
import { DEFAULT_CONTROLS } from './RichTextEditor.const';
import { prettifyHtml } from './RichTextEditor.helpers';
import { LabelKey, RICH_TEXT_EDITOR_LABELS } from './RichTextEditor.labels';
import {
	ALL_RICH_TEXT_HEADINGS,
	type Heading,
	Locale,
	type RichTextEditorControl,
	type RichTextEditorMedia,
	type RichTextEditorUploadInfo,
} from './RichTextEditor.types';
import './RichTextEditor.scss';

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
	locale?: 'nl' | 'en';
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
	locale = Locale.nl,
}: RichTextEditorInternalProps) => {
	const resolvedControls = controls ?? DEFAULT_CONTROLS;
	const resolvedHeadings =
		enabledHeadings && enabledHeadings.length > 0 ? enabledHeadings : ALL_RICH_TEXT_HEADINGS;
	const labels = RICH_TEXT_EDITOR_LABELS[locale];
	const [, setEditorSelection] = useState<{ from: number; to: number }>({ from: 0, to: 0 });
	const [isHtmlView, setIsHtmlView] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [prettyHtml, setPrettyHtml] = useState(prettifyHtml(value || ''));
	const [overlayTop, setOverlayTop] = useState(0);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const toolbarRef = useRef<HTMLDivElement | null>(null);

	const editor = useEditor({
		extensions: [
			StarterKit, // Already includes link and underline functionality
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
				} else if (event.key === 'Backspace' || event.key === 'Delete') {
					onDelete?.();
				} else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
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
		onSelectionUpdate: ({ editor }) => {
			const { from, to } = editor.state.selection;
			setEditorSelection({ from, to });
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
		if (editor?.isActive('heading', { level: 1 })) {
			return 'h1';
		}
		if (editor?.isActive('heading', { level: 2 })) {
			return 'h2';
		}
		if (editor?.isActive('heading', { level: 3 })) {
			return 'h3';
		}
		if (editor?.isActive('heading', { level: 4 })) {
			return 'h4';
		}
		if (editor?.isActive('heading', { level: 5 })) {
			return 'h5';
		}
		if (editor?.isActive('heading', { level: 6 })) {
			return 'h6';
		}
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
					title: labels[LabelKey.Bold],
					onClick: () => editor?.chain().focus().toggleBold().run(),
					isActive: !!editor?.isActive('bold'),
				});
			case 'italic':
				return renderButton({
					key: `italic-${index}`,
					label: <ItalicIcon />,
					title: labels[LabelKey.Italic],
					onClick: () => editor?.chain().focus().toggleItalic().run(),
					isActive: !!editor?.isActive('italic'),
				});
			case 'underline':
				return renderButton({
					key: `underline-${index}`,
					label: <UnderlineIcon />,
					title: labels[LabelKey.Underline],
					onClick: () => editor?.chain().focus().toggleUnderline().run(),
					isActive: !!editor?.isActive('underline'),
				});
			case 'strike-through':
				return renderButton({
					key: `strike-${index}`,
					label: <StrikeThroughIcon />,
					title: labels[LabelKey.Strikethrough],
					onClick: () => editor?.chain().focus().toggleStrike().run(),
					isActive: !!editor?.isActive('strike'),
				});
			case 'subscript':
				return renderButton({
					key: `subscript-${index}`,
					label: <SubscriptIcon />,
					title: labels[LabelKey.Subscript],
					onClick: () => editor?.chain().focus().toggleSubscript().run(),
					isActive: !!editor?.isActive('subscript'),
				});
			case 'superscript':
				return renderButton({
					key: `superscript-${index}`,
					label: <SuperscriptIcon />,
					title: labels[LabelKey.Superscript],
					onClick: () => editor?.chain().focus().toggleSuperscript().run(),
					isActive: !!editor?.isActive('superscript'),
				});
			case 'headings':
				return (
					<RichTextEditorHeadingsDropdown
						key={`headings-${index}`}
						editor={editor}
						root={root}
						isDisabled={areToolbarActionsDisabled}
						resolvedHeadings={resolvedHeadings}
						activeHeading={getActiveHeading()}
						labels={labels}
					/>
				);
			case 'list-ul':
				return renderButton({
					key: `list-ul-${index}`,
					label: <ListUnorderedIcon />,
					title: labels[LabelKey.UnorderedList],
					onClick: () => editor?.chain().focus().toggleBulletList().run(),
					isActive: !!editor?.isActive('bulletList'),
				});
			case 'list-ol':
				return renderButton({
					key: `list-ol-${index}`,
					label: <ListNumericIcon />,
					title: labels[LabelKey.OrderedList],
					onClick: () => editor?.chain().focus().toggleOrderedList().run(),
					isActive: !!editor?.isActive('orderedList'),
				});
			case 'hr':
				return renderButton({
					key: `hr-${index}`,
					label: <HrIcon />,
					title: labels[LabelKey.HorizontalLine],
					onClick: () => editor?.chain().focus().setHorizontalRule().run(),
				});
			case 'link':
				return (
					<div key="rich-text-editor__link-dropdown">
						<RichTextEditorLinkDropdown
							key={`link-${index}`}
							editor={editor}
							root={root}
							isDisabled={areToolbarActionsDisabled}
							labels={labels}
						/>
						{renderButton({
							key: `unlink-${index}`,
							label: <UnlinkIcon />,
							title: labels[LabelKey.RemoveLink],
							onClick: () => editor?.chain().focus().unsetLink().run(),
							isDisabled: areToolbarActionsDisabled || !editor?.isActive('link'),
						})}
					</div>
				);
			case 'media':
				return renderButton({
					key: `media-${index}`,
					label: <ImageIcon />,
					title: labels[LabelKey.AddImage],
					onClick: () => fileInputRef.current?.click(),
					isDisabled: areToolbarActionsDisabled || !media,
				});
			case 'table':
				return (
					<RichTextEditorTableDropdown
						key={`table-${index}`}
						editor={editor}
						root={root}
						isDisabled={areToolbarActionsDisabled}
						labels={labels}
					/>
				);
			case 'text-align':
				return [
					renderButton({
						key: `align-left-${index}`,
						label: <AlignLeftIcon />,
						title: labels[LabelKey.AlignLeft],
						onClick: () => editor?.chain().focus().setTextAlign('left').run(),
						isActive: isLeftAligned,
					}),
					renderButton({
						key: `align-center-${index}`,
						label: <AlignCenterIcon />,
						title: labels[LabelKey.AlignCenter],
						onClick: () => editor?.chain().focus().setTextAlign('center').run(),
						isActive: isCentered,
					}),
					renderButton({
						key: `align-right-${index}`,
						label: <AlignRightIcon />,
						title: labels[LabelKey.AlignRight],
						onClick: () => editor?.chain().focus().setTextAlign('right').run(),
						isActive: isRightAligned,
					}),
					renderButton({
						key: `align-justify-${index}`,
						label: <AlignJustifyIcon />,
						title: labels[LabelKey.Justify],
						onClick: () => editor?.chain().focus().setTextAlign('justify').run(),
						isActive: isJustified,
					}),
				];
			case 'undo':
				return renderButton({
					key: `undo-${index}`,
					label: <UndoIcon />,
					title: labels[LabelKey.Undo],
					onClick: () => editor?.chain().focus().undo().run(),
					isDisabled: areToolbarActionsDisabled || !canUndo,
				});
			case 'redo':
				return renderButton({
					key: `redo-${index}`,
					label: <RedoIcon />,
					title: labels[LabelKey.Redo],
					onClick: () => editor?.chain().focus().redo().run(),
					isDisabled: areToolbarActionsDisabled || !canRedo,
				});
			case 'fullscreen':
				return renderButton({
					key: `fullscreen-${index}`,
					label: isFullscreen ? <FullscreenCloseIcon /> : <FullscreenIcon />,
					title: labels[LabelKey.Fullscreen],
					onClick: () => setIsFullscreen((prev) => !prev),
					isActive: isFullscreen,
					isDisabled: !isEditorReady,
				});
			case 'edit-html':
				return renderButton({
					key: `edit-html-${index}`,
					label: <span>HTML</span>,
					title: labels[LabelKey.EditHtml],
					onClick: toggleHtmlView,
					isActive: isHtmlView,
					isDisabled: !isEditorReady,
				});
			case 'clear':
				return renderButton({
					key: `clear-${index}`,
					label: labels[LabelKey.ClearLabel],
					title: labels[LabelKey.Clear],
					onClick: () => editor?.chain().focus().clearContent().run(),
				});
			case 'remove-styles':
				return renderButton({
					key: `remove-styles-${index}`,
					label: <RemoveStylesIcon />,
					title: labels[LabelKey.RemoveStyles],
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
