import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import clsx from 'clsx';
import { $getRoot } from 'lexical';
import { type FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { LexicalToolbar } from './LexicalToolbar';
import { getHiddenHeadingClasses, prettifyHtml } from './RichTextEditor.helpers';
import {
	ALL_RICH_TEXT_HEADINGS,
	type Heading,
	type RichTextEditorControl,
} from './RichTextEditor.types';

import './RichTextEditor.scss';

// paragraph: 'c-rte__paragraph',
// 	quote: 'c-rte__quote',
// 	heading: {
// 		h1: 'h1',
// 		h2: 'h2',
// 		h3: 'h3',
// 		h4: 'h4',
// 		h5: 'h5',
// 		h6: 'h6',
// 	},
// 	list: {
// 		nested: { listitem: 'c-rte__list-nested-item' },
// 		ol: 'c-rte__ol',
// 		ul: 'c-rte__ul',
// 		listitem: 'c-rte__listitem',
// 		listitemChecked: 'c-rte__listitem--checked',
// 		listitemUnchecked: 'c-rte__listitem--unchecked',
// 	},
// 	link: 'c-rte__link',
// 	text: {
// 		bold: 'c-rte__text--bold',
// 		code: 'c-rte__text--code',
// 		italic: 'c-rte__text--italic',
// 		strikethrough: 'c-rte__text--strikethrough',
// 		subscript: 'c-rte__text--subscript',
// 		superscript: 'c-rte__text--superscript',
// 		underline: 'c-rte__text--underline',
// 		underlineStrikethrough: 'c-rte__text--underline-strikethrough',
// 	},
// 	code: 'c-rte__code',
// 	table: 'c-rte__table',
// 	tableCell: 'c-rte__table-cell',
// 	tableCellHeader: 'c-rte__table-cell--header',
// 	tableRow: 'c-rte__table-row',
// 	tableScrollableWrapper: 'c-rte__table-scrollable-wrapper',
// 	tableSelected: 'c-rte__table--selected',
// 	tableSelection: 'c-rte__table-selection',
// 	hr: 'c-rte__hr',
const editorTheme = {
	ltr: 'ltr',
	rtl: 'rtl',
	text: {
		underline: 'c-rte__text--underline',
		strikethrough: 'c-rte__text--strikethrough',
	},
};

const EDITOR_NODES = [
	HeadingNode,
	QuoteNode,
	ListNode,
	ListItemNode,
	LinkNode,
	AutoLinkNode,
	CodeNode,
	CodeHighlightNode,
	TableNode,
	TableCellNode,
	TableRowNode,
	HorizontalRuleNode,
];

// ---------------------------------------------------------------------------
// Plugins
// ---------------------------------------------------------------------------

/** Loads the initial HTML value once on mount */
function InitialHtmlPlugin({ initialHtml }: { initialHtml: string }) {
	const [editor] = useLexicalComposerContext();
	const initialized = useRef(false);

	useEffect(() => {
		if (initialized.current || !initialHtml) return;
		initialized.current = true;
		editor.update(
			() => {
				const parser = new DOMParser();
				const dom = parser.parseFromString(initialHtml, 'text/html');
				const nodes = $generateNodesFromDOM(editor, dom);
				const root = $getRoot();
				root.clear();
				root.append(...nodes);
			},
			{ discrete: true }
		);
	}, [editor, initialHtml]);

	return null;
}

/** Syncs the editor content when the external `value` prop changes */
function ExternalSyncPlugin({
	value,
	currentHtmlRef,
}: {
	value: string;
	currentHtmlRef: React.RefObject<string>;
}) {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		const newHtml = value ?? '';
		if (newHtml === currentHtmlRef.current) return;
		currentHtmlRef.current = newHtml;
		editor.update(() => {
			const parser = new DOMParser();
			const dom = parser.parseFromString(newHtml, 'text/html');
			const nodes = $generateNodesFromDOM(editor, dom);
			const root = $getRoot();
			root.clear();
			root.append(...nodes);
		});
	}, [editor, value, currentHtmlRef]);

	return null;
}

/** Exports HTML on every content change */
function HtmlOnChangePlugin({
	onChange,
	currentHtmlRef,
}: {
	onChange?: (html: string) => void;
	currentHtmlRef: React.RefObject<string>;
}) {
	const [editor] = useLexicalComposerContext();
	return (
		<OnChangePlugin
			onChange={(editorState) => {
				editorState.read(() => {
					const html = $generateHtmlFromNodes(editor);
					currentHtmlRef.current = html;
					onChange?.(html);
				});
			}}
			ignoreSelectionChange
		/>
	);
}

/** Syncs editor editable state with the `disabled` prop */
function EditablePlugin({ disabled }: { disabled?: boolean }) {
	const [editor] = useLexicalComposerContext();
	useEffect(() => {
		editor.setEditable(!disabled);
	}, [editor, disabled]);
	return null;
}

// ---------------------------------------------------------------------------
// LexicalEditorCoreProps
// ---------------------------------------------------------------------------

export interface LexicalEditorCoreProps {
	/** Initial HTML – used as uncontrolled default (the parent does NOT track every keystroke) */
	initialHtml?: string;
	/** Controlled HTML value – synced back in when the parent changes it externally */
	value?: string;
	onChange?: (html: string) => void;
	onBlur?: () => void;
	onFocus?: () => void;
	onSave?: () => void;
	placeholder?: string;
	disabled?: boolean;
	controls?: RichTextEditorControl[];
	id?: string;
	className?: string;
	rootClassName?: string;
	enabledHeadings?: Heading[];
}

// ---------------------------------------------------------------------------
// LexicalEditorCore
// ---------------------------------------------------------------------------

export const LexicalEditorCore: FunctionComponent<LexicalEditorCoreProps> = ({
	initialHtml = '',
	value,
	onChange,
	onBlur,
	onFocus,
	onSave,
	placeholder,
	disabled,
	controls,
	id,
	className,
	rootClassName: root = 'c-rich-text-editor',
	enabledHeadings = ALL_RICH_TEXT_HEADINGS,
}) => {
	const [isHtmlView, setIsHtmlView] = useState(false);
	const [prettyHtml, setPrettyHtml] = useState(prettifyHtml(value ?? initialHtml));
	const htmlEditRef = useRef<HTMLTextAreaElement | null>(null);
	// Tracks the last HTML that came from or was pushed to the editor.
	// Used to prevent syncing loops between internal onChange and external value changes.
	const currentHtmlRef = useRef<string>(value ?? initialHtml);

	const hasTable = controls?.includes('table') ?? false;

	// Propagate HTML-view toggling to parent via the onSave callback (used by editHtml control)
	const handleToggleHtmlView = useCallback((html: string) => {
		setIsHtmlView((prev) => {
			const next = !prev;
			if (!next) {
				// Exiting HTML view – the textarea content is in currentHtmlRef
				// (updated via onInput). The ExternalSyncPlugin will pick up the change
				// because currentHtmlRef is updated below and `value` will be different.
			}
			return next;
		});
		setPrettyHtml(prettifyHtml(html));
	}, []);

	const initialConfig = {
		namespace: 'RichTextEditor',
		theme: editorTheme,
		nodes: EDITOR_NODES,
		editable: !disabled,
		onError: (error: Error) => {
			console.error('Lexical error:', error);
		},
	};

	return (
		<div
			id={id}
			className={clsx(root, className, getHiddenHeadingClasses(enabledHeadings), 'c-content', {
				disabled,
				[`${root}--html-view`]: isHtmlView,
			})}
		>
			<LexicalComposer initialConfig={initialConfig}>
				{controls && (
					<LexicalToolbar
						controls={controls}
						root={root}
						id={id}
						onToggleHtmlView={handleToggleHtmlView}
						currentHtmlRef={currentHtmlRef}
					/>
				)}
				<div className={`${root}__editor-wrapper`}>
					<RichTextPlugin
						contentEditable={
							<ContentEditable
								className={`${root}__input`}
								aria-placeholder={placeholder ?? ''}
								placeholder={() =>
									placeholder ? <div className={`${root}__placeholder`}>{placeholder}</div> : null
								}
								onBlur={() => {
									onBlur?.();
									onSave?.();
								}}
								onFocus={() => onFocus?.()}
							/>
						}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<HistoryPlugin />
					<ListPlugin />
					<LinkPlugin />
					{hasTable && <TablePlugin hasCellMerge hasCellBackgroundColor={false} />}
					<HorizontalRulePlugin />
					<EditablePlugin disabled={disabled} />

					{/* Controlled mode: sync external value changes back into the editor */}
					{value !== undefined ? (
						<>
							<ExternalSyncPlugin value={value} currentHtmlRef={currentHtmlRef} />
							<HtmlOnChangePlugin onChange={onChange} currentHtmlRef={currentHtmlRef} />
						</>
					) : (
						<>
							<InitialHtmlPlugin initialHtml={initialHtml} />
							<HtmlOnChangePlugin onChange={onChange} currentHtmlRef={currentHtmlRef} />
						</>
					)}
				</div>

				{isHtmlView && (
					<textarea
						ref={htmlEditRef}
						className={`${root}__html-view`}
						defaultValue={prettyHtml}
						onInput={(e) => {
							const raw = e.currentTarget.value ?? '';
							currentHtmlRef.current = raw;
							onChange?.(raw);
						}}
					/>
				)}
			</LexicalComposer>
		</div>
	);
};
