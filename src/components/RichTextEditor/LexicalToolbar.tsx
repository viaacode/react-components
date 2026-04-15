import { $createCodeNode, $isCodeNode } from '@lexical/code';
import { $createLinkNode, $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import {
	$isListNode,
	INSERT_ORDERED_LIST_COMMAND,
	INSERT_UNORDERED_LIST_COMMAND,
	ListNode,
	REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';
import {
	$createHeadingNode,
	$createQuoteNode,
	$isHeadingNode,
	type HeadingTagType,
} from '@lexical/rich-text';
import {
	$getSelectionStyleValueForProperty,
	$patchStyleText,
	$setBlocksType,
} from '@lexical/selection';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import { $findMatchingParent, $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import clsx from 'clsx';
import {
	$createParagraphNode,
	$createTextNode,
	$getRoot,
	$getSelection,
	$isElementNode,
	$isRangeSelection,
	$isRootOrShadowRoot,
	CAN_REDO_COMMAND,
	CAN_UNDO_COMMAND,
	COMMAND_PRIORITY_CRITICAL,
	type ElementFormatType,
	FORMAT_ELEMENT_COMMAND,
	FORMAT_TEXT_COMMAND,
	INDENT_CONTENT_COMMAND,
	OUTDENT_CONTENT_COMMAND,
	REDO_COMMAND,
	SELECTION_CHANGE_COMMAND,
	UNDO_COMMAND,
} from 'lexical';
import {
	Baseline,
	Code,
	Eraser,
	Link,
	List,
	ListIndentDecrease,
	ListIndentIncrease,
	ListOrdered,
	Maximize,
	Minimize,
	Minus,
	Quote,
	Redo,
	Strikethrough,
	Subscript,
	Superscript,
	Table,
	TextAlignCenter,
	TextAlignEnd,
	TextAlignJustify,
	TextAlignStart,
	Undo,
	Unlink,
	X,
} from 'lucide-react';
import { type FunctionComponent, type RefObject, useCallback, useEffect, useState } from 'react';
import { ColorPicker } from '../ColorPicker';
import type { RichTextEditorControl } from './RichTextEditor.types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type BlockType =
	| 'paragraph'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'quote'
	| 'code'
	| 'bullet'
	| 'number';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSelectedNode(selection: ReturnType<typeof $getSelection>) {
	if (!$isRangeSelection(selection)) return null;
	const anchor = selection.anchor;
	const focus = selection.focus;
	const anchorNode = anchor.getNode();
	const focusNode = focus.getNode();
	if (anchorNode === focusNode) return anchorNode;
	return anchor.isBefore(focus) ? anchorNode : focusNode;
}

// ---------------------------------------------------------------------------
// Individual toolbar button
// ---------------------------------------------------------------------------

interface ToolbarBtnProps {
	title: string;
	active?: boolean;
	disabled?: boolean;
	onClick: () => void;
	children: React.ReactNode;
	className?: string;
}

const ToolbarBtn: FunctionComponent<ToolbarBtnProps> = ({
	title,
	active,
	disabled,
	onClick,
	children,
	className,
}) => (
	<button
		type="button"
		title={title}
		aria-label={title}
		aria-pressed={active}
		disabled={disabled}
		className={clsx('c-rte-toolbar__btn', className, { 'c-rte-toolbar__btn--active': active })}
		onClick={onClick}
	>
		{children}
	</button>
);

// ---------------------------------------------------------------------------
// LexicalToolbar
// ---------------------------------------------------------------------------

export interface LexicalToolbarProps {
	controls: RichTextEditorControl[];
	root: string;
	id?: string;
	onToggleHtmlView: (currentHtml: string) => void;
	currentHtmlRef: RefObject<string>;
}

export const LexicalToolbar: FunctionComponent<LexicalToolbarProps> = ({
	controls,
	root,
	onToggleHtmlView,
	currentHtmlRef,
}) => {
	const [editor] = useLexicalComposerContext();

	// ── Toolbar state ────────────────────────────────────────────────────────
	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [isUnderline, setIsUnderline] = useState(false);
	const [isStrikethrough, setIsStrikethrough] = useState(false);
	const [isSubscript, setIsSubscript] = useState(false);
	const [isSuperscript, setIsSuperscript] = useState(false);
	// const [isCode, setIsCode] = useState(false);
	const [isLink, setIsLink] = useState(false);
	const [blockType, setBlockType] = useState<BlockType>('paragraph');
	const [alignment, setAlignment] = useState<ElementFormatType>('left');
	const [fontSize, setFontSize] = useState('16px');
	// const [fontFamily, setFontFamily] = useState('');
	const [textColor, setTextColor] = useState('#000000');
	const [bgColor, setBgColor] = useState('transparent');
	const [canUndo, setCanUndo] = useState(false);
	const [canRedo, setCanRedo] = useState(false);
	const [textTransform, setTextTransform] = useState('none');
	const [isHtmlView, setIsHtmlView] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [linkDialogOpen, setLinkDialogOpen] = useState(false);
	const [linkDialog, setLinkDialog] = useState({ displayText: '', href: '', openInNewTab: true });
	const [tableDialogOpen, setTableDialogOpen] = useState(false);
	const [tableDialog, setTableDialog] = useState({ rows: '3', columns: '3' });

	// ── Update toolbar state from current selection ──────────────────────────
	const updateToolbar = useCallback(() => {
		const selection = $getSelection();
		if (!$isRangeSelection(selection)) return;

		// Text format flags
		setIsBold(selection.hasFormat('bold'));
		setIsItalic(selection.hasFormat('italic'));
		setIsUnderline(selection.hasFormat('underline'));
		setIsStrikethrough(selection.hasFormat('strikethrough'));
		setIsSubscript(selection.hasFormat('subscript'));
		setIsSuperscript(selection.hasFormat('superscript'));
		// setIsCode(selection.hasFormat('code'));

		// Link
		const node = getSelectedNode(selection);
		if (node) {
			const parent = node.getParent();
			setIsLink($isLinkNode(parent) || $isLinkNode(node));
		}

		// Block type
		const anchorNode = selection.anchor.getNode();
		let element =
			anchorNode.getKey() === 'root'
				? anchorNode
				: $findMatchingParent(anchorNode, (e) => {
						const parent = e.getParent();
						return parent !== null && $isRootOrShadowRoot(parent);
					});
		if (element === null) {
			element = anchorNode.getTopLevelElementOrThrow();
		}

		if ($isListNode(element)) {
			const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
			const type = parentList ? parentList.getListType() : element.getListType();
			setBlockType(type as BlockType);
		} else if ($isHeadingNode(element)) {
			setBlockType(element.getTag() as BlockType);
		} else if ($isCodeNode(element)) {
			setBlockType('code');
		} else {
			setBlockType((element.getType() as BlockType) || 'paragraph');
		}

		// Alignment
		setAlignment(($isElementNode(element) ? element.getFormatType() : undefined) || 'left');

		// Inline styles
		setFontSize($getSelectionStyleValueForProperty(selection, 'font-size', '16px'));
		// setFontFamily($getSelectionStyleValueForProperty(selection, 'font-family', ''));
		setTextColor($getSelectionStyleValueForProperty(selection, 'color', '#000000'));
		setBgColor($getSelectionStyleValueForProperty(selection, 'background-color', 'transparent'));
		setTextTransform($getSelectionStyleValueForProperty(selection, 'text-transform', 'none'));
	}, []);

	useEffect(() => {
		return editor.registerCommand(
			SELECTION_CHANGE_COMMAND,
			() => {
				updateToolbar();
				return false;
			},
			COMMAND_PRIORITY_CRITICAL
		);
	}, [editor, updateToolbar]);

	useEffect(() => {
		return editor.registerUpdateListener(({ editorState }) => {
			editorState.read(() => {
				updateToolbar();
			});
		});
	}, [editor, updateToolbar]);

	useEffect(() => {
		return mergeRegister(
			editor.registerCommand(
				CAN_UNDO_COMMAND,
				(payload) => {
					setCanUndo(payload);
					return false;
				},
				COMMAND_PRIORITY_CRITICAL
			),
			editor.registerCommand(
				CAN_REDO_COMMAND,
				(payload) => {
					setCanRedo(payload);
					return false;
				},
				COMMAND_PRIORITY_CRITICAL
			)
		);
	}, [editor]);

	// ── Action handlers ───────────────────────────────────────────────────────

	const formatBlock = useCallback(
		(type: BlockType) => {
			editor.update(() => {
				const selection = $getSelection();
				if (!$isRangeSelection(selection)) return;
				if (type === 'paragraph') {
					$setBlocksType(selection, () => $createParagraphNode());
				} else if (type === 'quote') {
					$setBlocksType(selection, () => $createQuoteNode());
				} else if (type === 'code') {
					$setBlocksType(selection, () => $createCodeNode());
				} else {
					$setBlocksType(selection, () => $createHeadingNode(type as HeadingTagType));
				}
			});
		},
		[editor]
	);

	const toggleList = useCallback(
		(type: 'bullet' | 'number') => {
			if (blockType === type) {
				editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
			} else if (type === 'bullet') {
				editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
			} else {
				editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
			}
		},
		[editor, blockType]
	);

	const openLinkDialog = useCallback(() => {
		editor.getEditorState().read(() => {
			const selection = $getSelection();
			let displayText = '';
			let href = '';
			let openInNewTab = true;
			if ($isRangeSelection(selection)) {
				displayText = selection.getTextContent();
				const node = getSelectedNode(selection);
				if (node) {
					const parent = node.getParent();
					if ($isLinkNode(parent)) {
						href = parent.getURL();
						openInNewTab = parent.getTarget() === '_blank';
						displayText = displayText || parent.getTextContent();
					} else if ($isLinkNode(node)) {
						href = node.getURL();
						openInNewTab = node.getTarget() === '_blank';
						displayText = displayText || node.getTextContent();
					}
				}
			}
			setLinkDialog({ displayText, href, openInNewTab });
		});
		setLinkDialogOpen(true);
	}, [editor]);

	const confirmLink = useCallback(() => {
		const { displayText, href, openInNewTab } = linkDialog;
		if (!href) return;
		editor.update(() => {
			const selection = $getSelection();
			if (!$isRangeSelection(selection)) return;
			if (selection.isCollapsed()) {
				const linkNode = $createLinkNode(href, {
					target: openInNewTab ? '_blank' : null,
					rel: openInNewTab ? 'noopener noreferrer' : null,
				});
				linkNode.append($createTextNode(displayText || href));
				selection.insertNodes([linkNode]);
			} else {
				editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
					url: href,
					target: openInNewTab ? '_blank' : null,
					rel: openInNewTab ? 'noopener noreferrer' : null,
				});
			}
		});
		setLinkDialogOpen(false);
	}, [editor, linkDialog]);

	const unlinkSelection = useCallback(() => {
		editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
	}, [editor]);

	const clearContent = useCallback(() => {
		editor.update(() => {
			const root = $getRoot();
			root.clear();
			const paragraph = $createParagraphNode();
			root.append(paragraph);
			paragraph.select();
		});
	}, [editor]);

	const insertTable = useCallback(() => {
		setTableDialog({ rows: '3', columns: '3' });
		setTableDialogOpen(true);
	}, []);

	const confirmTable = useCallback(() => {
		const rows = parseInt(tableDialog.rows, 10);
		const columns = parseInt(tableDialog.columns, 10);
		if (!Number.isNaN(rows) && !Number.isNaN(columns) && rows > 0 && columns > 0) {
			editor.dispatchCommand(INSERT_TABLE_COMMAND, {
				rows: String(rows),
				columns: String(columns),
			});
		}
		setTableDialogOpen(false);
	}, [editor, tableDialog]);

	const applyStyle = useCallback(
		(styles: Record<string, string | null>) => {
			editor.update(() => {
				const selection = $getSelection();
				if ($isRangeSelection(selection)) {
					$patchStyleText(selection, styles);
				}
			});
		},
		[editor]
	);

	const clearFormatting = useCallback(() => {
		editor.update(() => {
			const selection = $getSelection();
			if (!$isRangeSelection(selection)) return;
			// Remove all text formats
			const formats = [
				'bold',
				'italic',
				'underline',
				'strikethrough',
				'subscript',
				'superscript',
				'code',
			] as const;
			for (const fmt of formats) {
				if (selection.hasFormat(fmt)) {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, fmt);
				}
			}
			// Remove inline styles
			$patchStyleText(selection, {
				'font-size': null,
				'font-family': null,
				color: null,
				'background-color': null,
				'line-height': null,
				'letter-spacing': null,
				'text-transform': null,
			});
		});
	}, [editor]);

	const toggleHtmlView = useCallback(() => {
		const next = !isHtmlView;
		setIsHtmlView(next);
		onToggleHtmlView(currentHtmlRef.current ?? '');
	}, [isHtmlView, onToggleHtmlView, currentHtmlRef]);

	const toggleFullscreen = useCallback(() => {
		const editorEl = editor.getRootElement();
		const wrapper = editorEl?.closest(`.${root}`) as HTMLElement | null;
		if (wrapper) {
			const next = !isFullscreen;
			wrapper.classList.toggle(`${root}--fullscreen`, next);
			setIsFullscreen(next);
		}
	}, [editor, root, isFullscreen]);

	// ── Render individual controls ───────────────────────────────────────────

	const renderControl = (control: RichTextEditorControl, index: number) => {
		switch (control) {
			case 'separator':
				return <span key={`sep-${index}`} className="c-rte-toolbar__separator" aria-hidden />;

			case 'bold':
				return (
					<ToolbarBtn
						key="bold"
						title="Bold"
						active={isBold}
						onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
					>
						<b>B</b>
					</ToolbarBtn>
				);

			case 'italic':
				return (
					<ToolbarBtn
						key="italic"
						title="Italic"
						active={isItalic}
						onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
					>
						<i>I</i>
					</ToolbarBtn>
				);

			case 'underline':
				return (
					<ToolbarBtn
						key="underline"
						title="Underline"
						active={isUnderline}
						onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
					>
						<u>U</u>
					</ToolbarBtn>
				);

			case 'strike-through':
				return (
					<ToolbarBtn
						key="strike-through"
						title="Strikethrough"
						active={isStrikethrough}
						onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
					>
						<Strikethrough size={16} />
					</ToolbarBtn>
				);

			case 'superscript':
				return (
					<ToolbarBtn
						key="superscript"
						title="Superscript"
						active={isSuperscript}
						onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript')}
					>
						<Superscript size={16} />
					</ToolbarBtn>
				);

			case 'subscript':
				return (
					<ToolbarBtn
						key="subscript"
						title="Subscript"
						active={isSubscript}
						onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript')}
					>
						<Subscript size={16} />
					</ToolbarBtn>
				);

			case 'code':
				return (
					<ToolbarBtn
						key="code"
						title="Code block"
						active={blockType === 'code'}
						onClick={() => formatBlock(blockType === 'code' ? 'paragraph' : 'code')}
					>
						<Code size={16} />
					</ToolbarBtn>
				);

			case 'blockquote':
				return (
					<ToolbarBtn
						key="blockquote"
						title="Blockquote"
						active={blockType === 'quote'}
						onClick={() => formatBlock(blockType === 'quote' ? 'paragraph' : 'quote')}
					>
						<Quote size={16} />
					</ToolbarBtn>
				);

			case 'headings':
				return (
					<select
						key="headings"
						className="c-rte-toolbar__select"
						title="Paragraph style"
						aria-label="Paragraph style"
						value={
							['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(blockType) ? blockType : 'paragraph'
						}
						onChange={(e) => formatBlock(e.target.value as BlockType)}
					>
						<option value="h1" className={`${root}--hide-h1-option`}>
							<h1>Heading 1</h1>
						</option>
						<option value="h2" className={`${root}--hide-h2-option`}>
							<h2>Heading 2</h2>
						</option>
						<option value="h3" className={`${root}--hide-h3-option`}>
							<h3>Heading 3</h3>
						</option>
						<option value="h4" className={`${root}--hide-h4-option`}>
							<h4>Heading 4</h4>
						</option>
						<option value="h5" className={`${root}--hide-h5-option`}>
							<h5>Heading 5</h5>
						</option>
						<option value="h6" className={`${root}--hide-h6-option`}>
							<h6>Heading 6</h6>
						</option>
						<option value="paragraph">Normal</option>
					</select>
				);

			case 'list-ul':
				return (
					<ToolbarBtn
						key="list-ul"
						title="Unordered list"
						active={blockType === 'bullet'}
						onClick={() => toggleList('bullet')}
					>
						<List size={16} />
					</ToolbarBtn>
				);

			case 'list-ol':
				return (
					<ToolbarBtn
						key="list-ol"
						title="Ordered list"
						active={blockType === 'number'}
						onClick={() => toggleList('number')}
					>
						<ListOrdered size={16} />
					</ToolbarBtn>
				);

			case 'link':
				return (
					<ToolbarBtn key="link" title="Voeg link in" active={isLink} onClick={openLinkDialog}>
						<Link size={16} />
					</ToolbarBtn>
				);

			case 'unlink':
				return (
					<ToolbarBtn
						key="unlink"
						title="Verwijder link"
						disabled={!isLink}
						onClick={unlinkSelection}
					>
						<Unlink size={16} />
					</ToolbarBtn>
				);

			case 'text-align':
				return (
					<span key="text-align" className="c-rte-toolbar__group">
						{(['left', 'center', 'right', 'justify'] as ElementFormatType[]).map((align) => (
							<ToolbarBtn
								key={`align-${align}`}
								title={`Align ${align}`}
								active={alignment === align}
								onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, align)}
							>
								{align === 'left' ? (
									<TextAlignStart size={16} />
								) : align === 'center' ? (
									<TextAlignCenter size={16} />
								) : align === 'right' ? (
									<TextAlignEnd size={16} />
								) : (
									<TextAlignJustify size={16} />
								)}
							</ToolbarBtn>
						))}
					</span>
				);

			case 'text-indent':
				return (
					<span key="text-indent" className="c-rte-toolbar__group">
						<ToolbarBtn
							title="Decrease indent"
							onClick={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)}
						>
							<ListIndentDecrease size={16} />
						</ToolbarBtn>
						<ToolbarBtn
							title="Increase indent"
							onClick={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)}
						>
							<ListIndentIncrease size={16} />
						</ToolbarBtn>
					</span>
				);

			case 'hr':
				return (
					<ToolbarBtn
						key="hr"
						title="Horizontal rule"
						onClick={() => editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)}
					>
						<Minus size={16} />
					</ToolbarBtn>
				);

			case 'table':
				return (
					<ToolbarBtn key="table" title="Insert table" onClick={insertTable}>
						<Table size={16} />
					</ToolbarBtn>
				);

			case 'undo':
				return (
					<ToolbarBtn
						key="undo"
						title="Undo"
						disabled={!canUndo}
						onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
					>
						<Undo size={16} />
					</ToolbarBtn>
				);

			case 'redo':
				return (
					<ToolbarBtn
						key="redo"
						title="Redo"
						disabled={!canRedo}
						onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
					>
						<Redo size={16} />
					</ToolbarBtn>
				);

			case 'remove-styles':
				return (
					<ToolbarBtn key="remove-styles" title="Verwijder stijl" onClick={clearFormatting}>
						<X size={16} />
					</ToolbarBtn>
				);

			case 'clear':
				return (
					<ToolbarBtn key="clear" title="Verwijder alle tekst" onClick={clearContent}>
						<Eraser size={16} />
					</ToolbarBtn>
				);

			case 'font-size':
				return (
					<select
						key="font-size"
						className="c-rte-toolbar__select c-rte-toolbar__select--sm"
						title="Font size"
						aria-label="Font size"
						value={fontSize}
						onChange={(e) => applyStyle({ 'font-size': e.target.value })}
					>
						{[
							'12px',
							'14px',
							'16px',
							'18px',
							'20px',
							'24px',
							'28px',
							'30px',
							'32px',
							'36px',
							'40px',
							'48px',
							'56px',
							'64px',
							'72px',
							'96px',
							'120px',
							'144px',
						].map((size) => (
							<option key={size} value={size}>
								{size.replace('px', '')}
							</option>
						))}
					</select>
				);

			// case 'font-family':
			// 	return (
			// 		<select
			// 			key="font-family"
			// 			className="c-rte-toolbar__select"
			// 			title="Font family"
			// 			aria-label="Font family"
			// 			value={fontFamily}
			// 			onChange={(e) => applyStyle({ 'font-family': e.target.value || null })}
			// 		>
			// 			<option value="">Default</option>
			// 			<option value="Arial, sans-serif">Arial</option>
			// 			<option value="Georgia, serif">Georgia</option>
			// 			<option value="'Times New Roman', serif">Times New Roman</option>
			// 			<option value="'Courier New', monospace">Courier New</option>
			// 			<option value="Verdana, sans-serif">Verdana</option>
			// 		</select>
			// 	);

			case 'line-height':
				return (
					<select
						key="line-height"
						className="c-rte-toolbar__select c-rte-toolbar__select--sm"
						title="Line height"
						aria-label="Line height"
						onChange={(e) => applyStyle({ 'line-height': e.target.value })}
					>
						{['1', '1.2', '1.5', '1.75', '2', '2.5', '3', '4'].map((v) => (
							<option key={v} value={v}>
								{v}
							</option>
						))}
					</select>
				);

			case 'letter-spacing':
				return (
					<select
						key="letter-spacing"
						className="c-rte-toolbar__select c-rte-toolbar__select--sm"
						title="Letter spacing"
						aria-label="Letter spacing"
						onChange={(e) => applyStyle({ 'letter-spacing': e.target.value })}
					>
						{['normal', '1px', '2px', '3px', '4px', '5px', '6px'].map((v) => (
							<option key={v} value={v}>
								{v}
							</option>
						))}
					</select>
				);

			case 'text-transform':
				return (
					<select
						key="text-transform"
						className="c-rte-toolbar__select"
						title="Text case"
						aria-label="Text case"
						value={textTransform}
						onChange={(e) => applyStyle({ 'text-transform': e.target.value })}
					>
						<option value="none">None</option>
						<option value="uppercase">UPPERCASE</option>
						<option value="lowercase">lowercase</option>
						<option value="capitalize">Capitalize</option>
					</select>
				);

			case 'text-color':
				return (
					<ColorPicker
						key="text-color"
						color={textColor || '#000000'}
						onChange={(c) => applyStyle({ color: c })}
						bgColor={bgColor && bgColor !== 'transparent' ? bgColor : '#ffffff'}
						onBgColorChange={(c) => applyStyle({ 'background-color': c })}
						icon={Baseline}
						iconSize={16}
					/>
				);

			case 'emoji':
				return (
					<ToolbarBtn
						key="emoji"
						title="Insert emoji"
						onClick={() => {
							const emoji = window.prompt('Paste or type an emoji:');
							if (emoji) {
								editor.update(() => {
									const selection = $getSelection();
									if ($isRangeSelection(selection)) {
										selection.insertText(emoji);
									}
								});
							}
						}}
					>
						😀
					</ToolbarBtn>
				);

			case 'media':
				return (
					<ToolbarBtn
						key="media"
						title="Insert image URL"
						onClick={() => {
							const url = window.prompt('Enter image URL:');
							if (url) {
								editor.update(() => {
									const selection = $getSelection();
									if ($isRangeSelection(selection)) {
										selection.insertText(`[image: ${url}]`);
									}
								});
							}
						}}
					>
						🖼
					</ToolbarBtn>
				);

			case 'fullscreen':
				return (
					<ToolbarBtn
						key="fullscreen"
						title={isFullscreen ? 'Sluit fullscreen' : 'Fullscreen'}
						onClick={toggleFullscreen}
					>
						{isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
					</ToolbarBtn>
				);

			case 'editHtml':
				return (
					<ToolbarBtn key="editHtml" title="Edit HTML" active={isHtmlView} onClick={toggleHtmlView}>
						{'</>'}
					</ToolbarBtn>
				);

			default:
				return null;
		}
	};

	return (
		<>
			<div className="c-rte-toolbar" role="toolbar" aria-label="Text formatting">
				{controls.map((control, i) => renderControl(control, i))}
			</div>
			{linkDialogOpen && (
				<div className="c-rte-link-dialog">
					<div className="c-rte-link-dialog__row">
						<label className="c-rte-link-dialog__label" htmlFor="rte-link-text">
							Tekst
						</label>
						<input
							id="rte-link-text"
							className="c-rte-link-dialog__input"
							type="text"
							value={linkDialog.displayText}
							onChange={(e) => setLinkDialog((prev) => ({ ...prev, displayText: e.target.value }))}
							placeholder="Link tekst"
						/>
					</div>
					<div className="c-rte-link-dialog__row">
						<label className="c-rte-link-dialog__label" htmlFor="rte-link-url">
							URL
						</label>
						<input
							id="rte-link-url"
							className="c-rte-link-dialog__input"
							type="url"
							value={linkDialog.href}
							onChange={(e) => setLinkDialog((prev) => ({ ...prev, href: e.target.value }))}
							placeholder="https://"
							// biome-ignore lint/a11y/noAutofocus: intentional focus for dialog
							autoFocus
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									confirmLink();
								}
								if (e.key === 'Escape') {
									e.preventDefault();
									setLinkDialogOpen(false);
								}
							}}
						/>
					</div>
					<div className="c-rte-link-dialog__row">
						<label className="c-rte-link-dialog__label c-rte-link-dialog__label--inline">
							<input
								type="checkbox"
								checked={linkDialog.openInNewTab}
								onChange={(e) =>
									setLinkDialog((prev) => ({ ...prev, openInNewTab: e.target.checked }))
								}
							/>
							Openen in nieuw tabblad
						</label>
					</div>
					<div className="c-rte-link-dialog__actions">
						<button
							type="button"
							className="c-rte-link-dialog__btn c-rte-link-dialog__btn--cancel"
							onClick={() => setLinkDialogOpen(false)}
						>
							Annuleer
						</button>
						<button
							type="button"
							className="c-rte-link-dialog__btn c-rte-link-dialog__btn--confirm"
							onClick={confirmLink}
						>
							Bevestig
						</button>
					</div>
				</div>
			)}
			{tableDialogOpen && (
				<div className="c-rte-link-dialog">
					<div className="c-rte-link-dialog__row">
						<label className="c-rte-link-dialog__label" htmlFor="rte-table-columns">
							Kolommen
						</label>
						<input
							id="rte-table-columns"
							className="c-rte-link-dialog__input c-rte-link-dialog__input--sm"
							type="number"
							min="1"
							max="20"
							value={tableDialog.columns}
							onChange={(e) => setTableDialog((prev) => ({ ...prev, columns: e.target.value }))}
							// biome-ignore lint/a11y/noAutofocus: intentional focus for dialog
							autoFocus
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									confirmTable();
								}
								if (e.key === 'Escape') {
									e.preventDefault();
									setTableDialogOpen(false);
								}
							}}
						/>
					</div>
					<div className="c-rte-link-dialog__row">
						<label className="c-rte-link-dialog__label" htmlFor="rte-table-rows">
							Rijen
						</label>
						<input
							id="rte-table-rows"
							className="c-rte-link-dialog__input c-rte-link-dialog__input--sm"
							type="number"
							min="1"
							max="50"
							value={tableDialog.rows}
							onChange={(e) => setTableDialog((prev) => ({ ...prev, rows: e.target.value }))}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									confirmTable();
								}
								if (e.key === 'Escape') {
									e.preventDefault();
									setTableDialogOpen(false);
								}
							}}
						/>
					</div>
					<div className="c-rte-link-dialog__row">
						<label className="c-rte-link-dialog__label" htmlFor="rte-table-test">
							TEST
						</label>
						<input
							id="rte-table-test"
							className="c-rte-link-dialog__input c-rte-link-dialog__input--sm"
							type="number"
							min="1"
							max="50"
							value={tableDialog.columns}
							onChange={(e) => setTableDialog((prev) => ({ ...prev, columns: e.target.value }))}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									confirmTable();
								}
								if (e.key === 'Escape') {
									e.preventDefault();
									setTableDialogOpen(false);
								}
							}}
						/>
					</div>
					<div className="c-rte-link-dialog__actions">
						<button
							type="button"
							className="c-rte-link-dialog__btn c-rte-link-dialog__btn--cancel"
							onClick={() => setTableDialogOpen(false)}
						>
							Annuleer
						</button>
						<button
							type="button"
							className="c-rte-link-dialog__btn c-rte-link-dialog__btn--confirm"
							onClick={confirmTable}
						>
							Tabel invoegen
						</button>
					</div>
				</div>
			)}
		</>
	);
};
